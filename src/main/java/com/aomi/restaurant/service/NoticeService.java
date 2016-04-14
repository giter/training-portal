package com.aomi.restaurant.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.aomi.restaurant.pojo.Notice;
import com.aomi.restaurant.vo.NoticePageParam;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

@Service
public class NoticeService extends CRUDService<Notice, NoticePageParam> {

  @Resource
  RestaurantDAO DAO;

  @Override
  public Class<Notice> clazz() {
    return Notice.class;
  }

  @Override
  public DBObject query(NoticePageParam param) {

    BasicDBObjectBuilder builder = BasicDBObjectBuilder.start();

    if (param != null) {

      if (param.getVisible() != null) {

        builder.add("visible", new BasicDBObject("$ne", 0));
      }
    }

    return builder.get();
  }

  @Override
  public Notice insert(Notice t) {

    t.put("visible", t.getVisible());
    t.put("top", t.getTop());

    return super.insert(t);
  }

  @Override
  public DBCollection collection() {
    return DAO.notice;
  }
}
