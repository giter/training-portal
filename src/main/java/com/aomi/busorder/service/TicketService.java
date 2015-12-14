package com.aomi.busorder.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang3.math.NumberUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.aomi.busorder.param.BusParam;
import com.aomi.busorder.param.SeatParam;
import com.aomi.busorder.param.TicketParam;
import com.aomi.busorder.pojo.Bus;
import com.aomi.busorder.pojo.Seat;
import com.aomi.busorder.pojo.Ticket;
import com.aomi.busorder.pojo.User;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.Bytes;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

@Service
public class TicketService {

  @Resource
  MongoDAO dao;

  @Resource
  BusService busService;

  @Resource
  UserService userService;

  @Resource
  SeatService seatService;

  @Resource
  ContextService context;

  public Ticket get(String id) {

    return (Ticket) dao.ticket.findOne(id);
  }

  /***
   * 退订或代退订
   * 
   * @param id
   *          票根
   * @param user
   *          用户号
   * @return
   */
  public Ticket refund(String id, User user) {

    DBObject query = BasicDBObjectBuilder
        .start()
        .add("_id", id)
        .add(
            "$or",
            new Object[] {
                new BasicDBObject(Ticket.FIELD_USER + "._id", user.get_id()),
                new BasicDBObject(Ticket.FIELD_SOURCE + "._id", user.get_id()) })
        .get();

    DBObject update = BasicDBObjectBuilder.start().push("$unset")
        .add(Ticket.FIELD_USER, 1).add(Ticket.FIELD_SOURCE, 1).pop().get();

    return (Ticket) dao.ticket.findAndModify(query, update);
  }

  public Ticket take(String id, User user, User source) {

    DBObject query = BasicDBObjectBuilder.start().add("_id", id)
        .push(Ticket.FIELD_USER + "." + User.FIELD_ID).add("$exists", false)
        .pop().get();

    DBObject update = BasicDBObjectBuilder.start().push("$set")
        .add(Ticket.FIELD_USER, user).add(Ticket.FIELD_SOURCE, source).get();

    return (Ticket) dao.ticket.findAndModify(query, update);
  }

  /***
   * 订票
   * 
   * @param id
   *          票号
   * @param user
   *          用户
   * @return 成功=> ticket，失败 => null
   */
  public Ticket take(String id, User user) {

    return take(id, user, null);
  }

  public List<Ticket> takes(User source, List<Pair<String, User>> tickets) {

    List<Ticket> ts = new ArrayList<>(tickets.size());

    boolean succeed = true;
    for (Pair<String, User> ticket : tickets) {

      Ticket t = take(ticket.getKey(), ticket.getValue(), source);
      succeed &= t != null;

      ts.add(t);
    }

    if (!succeed) {

      for (Pair<String, User> ticket : tickets) {

        refund(ticket.getKey(), ticket.getValue());
      }

      ts.clear();
    }

    return ts;
  }

  /***
   * 订票
   * 
   * @param date
   *          日期
   * @param seat
   *          座位
   * @param user
   *          用户
   * @return 成功=> ticket，失败 => null
   */
  public Ticket take(String date, Seat seat, User user) {

    DBObject query = BasicDBObjectBuilder.start().add("date", date)
        .add("seat._id", seat.get_id()).push("user._id").add("$exists", false)
        .pop().get();

    DBObject update = BasicDBObjectBuilder.start().push("$set")
        .add("user", user).get();

    return (Ticket) dao.ticket.findAndModify(query, update);
  }

  public boolean expired(Ticket ticket) {

    String date = ticket.getDate() + " " + ticket.getBus().getGoff();
    Date goff;

    try {
      goff = (new SimpleDateFormat("yyyy-MM-dd HH:mm")).parse(date);
    } catch (ParseException e) {
      throw new RuntimeException(e);
    }

    if (System.currentTimeMillis() >= goff.getTime())
      return true;

    String destination = ticket.getBus().getDestination();

    DBObject ctx = (DBObject) context.get();

    if (ctx == null) {
      return false;
    }

    if (!ctx.containsField("config"))
      return false;

    DBObject config = (DBObject) ctx.get("config");

    if (!config.containsField("end"))
      return false;

    DBObject end = (DBObject) config.get("end");

    if (!end.containsField(destination))
      return false;

    double a = NumberUtils.toDouble(end.get(destination).toString());

    long expired = (long) (goff.getTime() - a * 3600 * 1000);

    if (System.currentTimeMillis() > expired) {
      return true;
    }

    return false;
  }

  public boolean exceedLimit(User user, Ticket ticket) {

    TicketParam tp = new TicketParam();

    tp.setLimit(0);
    tp.setDate(ticket.getDate());
    tp.setOverlapping(Pair.of(ticket.getBus().getGoff(), ticket.getBus()
        .getArrive()));
    tp.setUid(user.get_id());

    return count(tp) >= user.getLimit();
  }

  public long countByDate(String uid, String date) {

    DBObject query = BasicDBObjectBuilder.start().add("date", date)
        .add("user._id", uid).get();

    return dao.ticket.count(query);
  }

  public Ticket insert(Ticket ticket) {

    ticket.set_id(new ObjectId().toHexString());
    ticket.setCreated(System.currentTimeMillis());
    ticket.setUpdated(System.currentTimeMillis());

    dao.ticket.insert(ticket);
    return ticket;
  }

  public Ticket getByDate(String date, String seatId) {

    DBObject query = BasicDBObjectBuilder.start(Ticket.FIELD_DATE, date)
        .add(Ticket.FIELD_SEAT + "._id", seatId).get();

    return (Ticket) dao.ticket.findOne(query);
  }

  /**
   * 清理该日期以前的车票记录
   * 
   * @param date
   *          eg. 2015-09-12
   */
  public void clean(String date) {

    DBObject query = BasicDBObjectBuilder.start().push("date").add("$lt", date)
        .pop().get();

    for (DBObject o : dao.ticket.find(query).setOptions(
        Bytes.QUERYOPTION_NOTIMEOUT)) {

      if (o.get("user") != null) {

        dao.oldticket.insert(o);
      }

      dao.ticket.remove(new BasicDBObject("_id", o.get("_id")));
    }
  }

  public int generateAll(String date) {

    BusParam param = new BusParam();

    param.setOnline(1);
    param.setLimit(0);

    int sum = 0;

    for (Bus bus : busService.page(param)) {

      sum += generateByBus(date, bus);
    }

    return sum;
  }

  public int generateByBus(String date, Bus bus) {

    SeatParam sparam = new SeatParam();
    sparam.setLimit(0);
    sparam.setBus(bus.get_id());

    int sum = 0;

    for (Seat seat : seatService.page(sparam)) {

      sum += generateBySeat(date, bus, seat);
    }

    return sum;
  }

  public int generateBySeat(String date, Bus bus, Seat seat) {

    if (getByDate(date, seat.get_id()) == null) {

      Ticket ticket = new Ticket();

      ticket.setBus(bus);
      ticket.setSeat(seat);
      ticket.setDate(date);

      this.insert(ticket);

      return 1;
    }

    return 0;
  }

  public DBObject query(TicketParam param) {

    BasicDBObjectBuilder ob = BasicDBObjectBuilder.start();

    if (param == null)
      return ob.get();

    if (param.getUid() != null) {

      ob.add(Ticket.FIELD_USER + "._id", param.getUid());
    }

    if (param.getBy() != null) {

      ob.add("$or", new Object[] {
          new BasicDBObject(Ticket.FIELD_USER + "._id", param.getBy()),
          new BasicDBObject(Ticket.FIELD_SOURCE + "._id", param.getBy()) });
    }

    if (param.getCompany() != null) {

      ob.add(Ticket.FIELD_USER + ".company", param.getCompany());
    }

    if (param.getDate() != null) {

      ob.add(Ticket.FIELD_DATE, param.getDate());
    }

    if (param.getOverlapping() != null) {

      ob.add(Ticket.FIELD_BUS + "." + Bus.FIELD_GOFF, new BasicDBObject("$lte",
          param.getOverlapping().getRight()));
      ob.add(Ticket.FIELD_BUS + "." + Bus.FIELD_ARRIVE, new BasicDBObject(
          "$gte", param.getOverlapping().getLeft()));
    }

    if (param.getBegin() != null) {

      ob.push(Ticket.FIELD_DATE).add("$gte", param.getBegin());

      if (param.getEnd() != null) {
        ob.add("$lte", param.getEnd());
      }

      ob.pop();
    }

    if (param.getEnd() != null) {

      ob.push(Ticket.FIELD_DATE).add("$lte", param.getEnd()).pop();
    }

    return ob.get();
  }

  @SuppressWarnings("unchecked")
  public List<Ticket> page(TicketParam param) {

    DBCollection coll = dao.ticket;

    if (param.isOld()) {
      coll = dao.oldticket;
    }

    DBCursor cursor = coll.find(query(param)).sort(
        BasicDBObjectBuilder.start(Ticket.FIELD_ID, -1).get());

    if (param != null && param.getLimit() > 0) {
      cursor.limit(param.getLimit());
    }

    if (param != null && param.getPage() > 0) {
      cursor.skip(param.getLimit() * param.getPage());
    }

    List<?> seat = cursor.toArray();
    return (List<Ticket>) seat;
  }

  public int count(TicketParam param) {

    return (int) dao.ticket.count(query(param));
  }

}
