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
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;

@Component
public class MongoDAO implements InitializingBean {

  private static final String COLLECTION_NAME_AUTHORIZE = "authorize";

  private static final String COLLECTION_NAME_TICKET = "ticket";

  private static final String COLLECTION_NAME_OLDTICKET = "oldticket";

  private static final String COLLECTION_NAME_SEAT = "seat";

  private static final String COLLECTION_NAME_BUS = "bus";

  private static final String COLLECTION_NAME_USER = "user";

  @Value("${mongodb.db}")
  String dbName;

  @Resource
  MongoClient client;

  public DBCollection user;

  public DBCollection bus;

  public DBCollection seat;

  public DBCollection ticket;

  /**
   * 旧票
   */
  public DBCollection oldticket;

  public DBCollection authorize;

  @Override
  public void afterPropertiesSet() throws Exception {

    client.setWriteConcern(WriteConcern.ACKNOWLEDGED);

    user = client.getDB(dbName).getCollection(COLLECTION_NAME_USER);
    user.setObjectClass(User.class);

    bus = client.getDB(dbName).getCollection(COLLECTION_NAME_BUS);
    bus.setObjectClass(Bus.class);

    seat = client.getDB(dbName).getCollection(COLLECTION_NAME_SEAT);
    seat.setObjectClass(Seat.class);

    ticket = client.getDB(dbName).getCollection(COLLECTION_NAME_TICKET);
    oldticket = client.getDB(dbName).getCollection(COLLECTION_NAME_OLDTICKET);

    ticket.setObjectClass(Ticket.class);

    ticket.setInternalClass(COLLECTION_NAME_USER, User.class);
    ticket.setInternalClass(COLLECTION_NAME_BUS, Bus.class);
    ticket.setInternalClass(COLLECTION_NAME_SEAT, Seat.class);

    ticket.createIndex(BasicDBObjectBuilder.start(Ticket.FIELD_DATE, 1)
        .add("seat._id", 1).get());

    authorize = client.getDB(dbName).getCollection(COLLECTION_NAME_AUTHORIZE);
    authorize.setObjectClass(Authorize.class);

  }

}
