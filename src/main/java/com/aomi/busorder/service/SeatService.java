package com.aomi.busorder.service;

import java.util.List;

import javax.annotation.Resource;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.aomi.busorder.pojo.Seat;
import com.mongodb.BasicDBObjectBuilder;
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

  public List<DBObject> items() {

    return dao.seat.find().toArray();
  }

  public List<DBObject> page(String bus, int page, int limit) {

    return dao.seat.find(BasicDBObjectBuilder.start(Seat.FIELD_BUS, bus).get())
        .sort(BasicDBObjectBuilder.start(Seat.FIELD_ID, -1).get()).limit(limit)
        .skip(limit * page).toArray();
  }

  public long count(String id) {

    return dao.seat.count(BasicDBObjectBuilder.start(Seat.FIELD_BUS, id).get());
  }

}
