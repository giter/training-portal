package com.aomi.restaurant.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.aomi.restaurant.pojo.Table;
import com.aomi.restaurant.vo.TablePageParam;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

@Service
public class TableService extends CRUDService<Table, TablePageParam> {

  @Resource
  RestaurantDAO DAO;

  @Override
  public Class<Table> clazz() {
    return Table.class;
  }

  @Override
  public DBObject query(TablePageParam param) {

    BasicDBObjectBuilder builder = BasicDBObjectBuilder.start();

    if (param != null) {

      if (param.getVisible() != null) {

        builder.add("visible", new BasicDBObject("$ne", 0));
      }
    }
    return builder.get();
  }

  @Override
  public Table insert(Table t) {

    t.put("visible", t.getVisible());

    return super.insert(t);
  }

  @Override
  public DBCollection collection() {
    return DAO.table;
  }
}
