package com.aomi.restaurant.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.aomi.restaurant.pojo.Pack;
import com.aomi.restaurant.vo.PackPageParam;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

@Service
public class PackService extends CRUDService<Pack, PackPageParam> {

  @Resource
  RestaurantDAO DAO;

  @Override
  public Class<Pack> clazz() {
    return Pack.class;
  }

  @Override
  public DBObject query(PackPageParam param) {

    BasicDBObjectBuilder builder = BasicDBObjectBuilder.start();

    if (param.getNumber() != null) {
      builder.add("number", param.getNumber());
    }

    return builder.get();
  }

  @Override
  public DBCollection collection() {
    return DAO.pack;
  }

  @Override
  public Pack insert(Pack t) {

    t.put("state", t.getState());

    return super.insert(t);
  }
}
