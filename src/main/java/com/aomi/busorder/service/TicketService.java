package com.aomi.busorder.service;

import javax.annotation.Resource;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.aomi.busorder.param.BusParam;
import com.aomi.busorder.param.SeatParam;
import com.aomi.busorder.pojo.Bus;
import com.aomi.busorder.pojo.Seat;
import com.aomi.busorder.pojo.Ticket;
import com.aomi.busorder.pojo.User;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.Bytes;
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

  public Ticket get(String id) {

    return (Ticket) dao.ticket.findOne(id);
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

  public Ticket insert(Ticket ticket) {

    ticket.set_id(new ObjectId().toHexString());
    ticket.setCreated(System.currentTimeMillis());
    ticket.setUpdated(System.currentTimeMillis());

    dao.ticket.insert(ticket);
    return ticket;
  }

  public Ticket getByDate(String date, String seatId) {

    return (Ticket) dao.ticket.findOne(BasicDBObjectBuilder
        .start(Ticket.FIELD_DATE, date).add(Ticket.FIELD_SEAT + "._id", seatId)
        .get());
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

}
