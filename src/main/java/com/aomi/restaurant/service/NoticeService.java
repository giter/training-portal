package com.aomi.restaurant.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.aomi.restaurant.pojo.Notice;
import com.aomi.restaurant.vo.NoticePageParam;
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

        builder.add("visible", param.getVisible());
      }
    }

    return builder.get();
  }

  @Override
  public DBCollection collection() {
    return DAO.notice;
  }
}
