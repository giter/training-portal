package com.aomi.busorder.service;

import java.util.List;

import javax.annotation.Resource;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.aomi.busorder.misc.PinYinUtils;
import com.aomi.busorder.pojo.Bus;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBObject;

@Service
public class BusService {

  @Resource
  MongoDAO dao;

  public Bus get(String _id) {

    return (Bus) dao.bus.findOne(_id);
  }

  public Bus insert(Bus bus) {

    bus.set_id(new ObjectId().toHexString());
    bus.setCreated(System.currentTimeMillis());
    bus.setUpdated(System.currentTimeMillis());

    if (bus.getDestination() != null) {
      bus.setCapital(PinYinUtils.capital(bus.getDestination()));
      bus.setPinyin(PinYinUtils.pinyin(bus.getDestination()));
    }

    dao.bus.insert(bus);
    return bus;
  }

  public Bus save(Bus bus) {

    bus.setUpdated(System.currentTimeMillis());

    if (bus.getDestination() != null) {
      bus.setCapital(PinYinUtils.capital(bus.getDestination()));
      bus.setPinyin(PinYinUtils.pinyin(bus.getDestination()));
    }

    dao.bus.save(bus);

    return bus;
  }

  public Bus remove(String _id) {

    return (Bus) dao.bus.findAndRemove(BasicDBObjectBuilder.start(Bus.FIELD_ID,
        _id).get());
  }

  public List<DBObject> items() {

    return dao.bus.find().toArray();
  }

  public List<DBObject> page(int page, int limit) {

    return dao.bus.find()
        .sort(BasicDBObjectBuilder.start(Bus.FIELD_ID, -1).get()).limit(limit)
        .skip(limit * page).toArray();
  }

  public long count() {

    return dao.bus.count();
  }

}
