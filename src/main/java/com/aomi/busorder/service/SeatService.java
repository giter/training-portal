package com.aomi.busorder.service;

import java.util.List;

import javax.annotation.Resource;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.aomi.busorder.param.SeatParam;
import com.aomi.busorder.pojo.Seat;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

@Service
public class SeatService {

  @Resource
  MongoDAO dao;

  public Seat get(String sid) {

    return (Seat) dao.seat.findOne(sid);
  }

  public Seat insert(Seat seat) {

    seat.set_id(new ObjectId().toHexString());
    seat.setCreated(System.currentTimeMillis());
    seat.setUpdated(System.currentTimeMillis());

    dao.seat.insert(seat);
    return seat;
  }

  public Seat save(Seat seat) {

    seat.setUpdated(System.currentTimeMillis());
    dao.seat.save(seat);

    return seat;
  }

  public Seat remove(String _id) {

    return (Seat) dao.seat.findAndRemove(BasicDBObjectBuilder.start(
        Seat.FIELD_ID, _id).get());
  }

  public void removeAll(String bus) {

    dao.seat.remove(BasicDBObjectBuilder.start(Seat.FIELD_BUS, bus).get());
  }

  public DBObject query(SeatParam param) {

    BasicDBObjectBuilder ob = BasicDBObjectBuilder.start();

    if (param == null)
      return ob.get();

    if (param.getBus() != null) {
      ob.add(Seat.FIELD_BUS, param.getBus());
    }

    return ob.get();
  }

  public List<DBObject> items() {

    return dao.seat.find().toArray();
  }

  @SuppressWarnings("unchecked")
  public List<Seat> page(SeatParam param) {

    DBCursor cursor = dao.seat.find(query(param)).sort(
        BasicDBObjectBuilder.start(Seat.FIELD_ID, -1).get());

    if (param != null && param.getLimit() > 0) {
      cursor.limit(param.getLimit());
    }

    if (param != null && param.getPage() > 0) {
      cursor.skip(param.getLimit() * param.getPage());
    }

    List<?> seat = cursor.toArray();
    return (List<Seat>) seat;
  }

  public long count(SeatParam param) {

    return dao.seat.count(query(param));
  }

}
