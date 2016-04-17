package com.aomi.restaurant.service;

import javax.annotation.Resource;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.aomi.busorder.pojo.User;
import com.aomi.restaurant.pojo.Dish;
import com.aomi.restaurant.pojo.Notice;
import com.aomi.restaurant.pojo.Order;
import com.aomi.restaurant.pojo.Table;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;
import com.mongodb.gridfs.GridFS;

@Component
public class RestaurantDAO implements InitializingBean {

  @Resource
  MongoClient client;

  @Value("${mongodb.db}")
  String dbName;

  public DBCollection notice;
  public DBCollection table;
  public DBCollection dish;
  public DBCollection order;

  public GridFS gridFS;

  @Override
  public void afterPropertiesSet() throws Exception {

    client.setWriteConcern(WriteConcern.ACKNOWLEDGED);

    gridFS = new GridFS(client.getDB(dbName));

    notice = client.getDB(dbName).getCollection("notice");

    notice.setObjectClass(Notice.class);
    notice.setInternalClass("user", User.class);

    table = client.getDB(dbName).getCollection("table");

    table.setObjectClass(Table.class);

    dish = client.getDB(dbName).getCollection("dish");

    dish.setObjectClass(Dish.class);

    order = client.getDB(dbName).getCollection("order");

    order.setObjectClass(Order.class);

    order.setInternalClass("user", User.class);
    order.setInternalClass("table", Table.class);
    order.setInternalClass("menu", Dish.class);

    order.createIndex(BasicDBObjectBuilder.start("mdate", 1).add("mtime", 1)
        .add("state", 1).get());
  }
}
