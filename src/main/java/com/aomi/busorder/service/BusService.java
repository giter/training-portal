package com.aomi.busorder.service;

import java.util.List;

import javax.annotation.Resource;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.aomi.busorder.misc.PinYinUtils;
import com.aomi.busorder.param.BusParam;
import com.aomi.busorder.pojo.Bus;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCursor;
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

  public DBObject query(BusParam param) {

    BasicDBObjectBuilder ob = BasicDBObjectBuilder.start();

    if (param == null)
      return ob.get();

    if (param.getOnline() != null) {
      ob.add(Bus.FIELD_ONLINE, param.getOnline());
    }

    return ob.get();
  }

  public List<DBObject> page(BusParam param) {

    DBCursor cursor = dao.bus.find(query(param)).sort(
        BasicDBObjectBuilder.start(Bus.FIELD_ID, -1).get());

    if (param.getLimit() > 0) {
      cursor.limit(param.getLimit());
    }

    if (param.getPage() > 0) {
      cursor.skip(param.getLimit() * param.getPage());
    }

    return cursor.toArray();
  }

  public long count(BusParam param) {

    return dao.bus.count(query(param));
  }

}
