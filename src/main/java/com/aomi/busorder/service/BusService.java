package com.aomi.busorder.service;

import java.util.List;

import javax.annotation.Resource;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.aomi.busorder.misc.PinYinUtils;
import com.aomi.busorder.param.BusParam;
import com.aomi.busorder.pojo.Bus;
import com.mongodb.BasicDBObject;
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

    dao.ticket.update(new BasicDBObject("bus._id", bus.get_id()),
        BasicDBObjectBuilder.start().push("$set").add("bus", bus).get(), false,
        true);

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

      ob.add(Bus.FIELD_ONLINE,
          new BasicDBObject("$in", new Object[] { param.getOnline(),
              param.getOnline().toString() }));
    }

    if (param.getDestination() != null) {
      ob.add(Bus.FIELD_DESTINATION, param.getDestination());
    }

    if (param.getWeek() != null) {
      ob.add("weeks." + param.getWeek(), true);
    }

    return ob.get();
  }

  @SuppressWarnings("unchecked")
  public List<Bus> page(BusParam param) {

    DBCursor cursor = dao.bus.find(query(param)).sort(
        param.getSort() != null ? param.getSort() : BasicDBObjectBuilder.start(
            Bus.FIELD_ID, -1).get());

    if (param != null && param.getLimit() > 0) {
      cursor.limit(param.getLimit());
    }

    if (param != null && param.getPage() > 0) {
      cursor.skip(param.getLimit() * param.getPage());
    }

    List<?> buses = cursor.toArray();
    return (List<Bus>) buses;
  }

  public long count(BusParam param) {

    return dao.bus.count(query(param));
  }

}
