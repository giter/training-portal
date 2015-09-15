package com.aomi.busorder.service;

import javax.annotation.Resource;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.aomi.busorder.pojo.Authorize;
import com.aomi.busorder.pojo.Bus;
import com.aomi.busorder.pojo.Seat;
import com.aomi.busorder.pojo.Ticket;
import com.aomi.busorder.pojo.User;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;

@Component
public class MongoDAO implements InitializingBean {

  @Value("${mongodb.db}")
  String db_name;

  @Resource
  MongoClient client;

  public DBCollection user;

  public DBCollection bus;

  public DBCollection seat;

  public DBCollection ticket;

  public DBCollection authorize;

  @Override
  public void afterPropertiesSet() throws Exception {

    client.setWriteConcern(WriteConcern.ACKNOWLEDGED);

    user = client.getDB(db_name).getCollection("user");
    user.setObjectClass(User.class);

    bus = client.getDB(db_name).getCollection("bus");
    bus.setObjectClass(Bus.class);

    seat = client.getDB(db_name).getCollection("seat");
    seat.setObjectClass(Seat.class);

    ticket = client.getDB(db_name).getCollection("ticket");
    ticket.setObjectClass(Ticket.class);

    authorize = client.getDB(db_name).getCollection("authorize");
    authorize.setObjectClass(Authorize.class);

  }

}
