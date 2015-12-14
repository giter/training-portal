package com.aomi.busorder.service;

import javax.annotation.Resource;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.aomi.busorder.pojo.Authorize;
import com.aomi.busorder.pojo.Bus;
import com.aomi.busorder.pojo.Seat;
import com.aomi.busorder.pojo.Ticket;
import com.aomi.busorder.pojo.Trace;
import com.aomi.busorder.pojo.User;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
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

  private static final String COLLECTION_NAME_TRACE = "trace";

  private static final String COLLECTION_NAME_SYSTEM = "system";

  @Value("${mongodb.db}")
  String dbName;

  @Resource
  MongoClient client;

  public DBCollection user;

  public DBCollection bus;

  public DBCollection seat;

  public DBCollection ticket;

  public DBCollection trace;

  public DBCollection system;

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

    user.createIndex(BasicDBObjectBuilder.start("openID", 1).get());

    bus = client.getDB(dbName).getCollection(COLLECTION_NAME_BUS);
    bus.setObjectClass(Bus.class);

    seat = client.getDB(dbName).getCollection(COLLECTION_NAME_SEAT);
    seat.setObjectClass(Seat.class);

    ticket = client.getDB(dbName).getCollection(COLLECTION_NAME_TICKET);
    oldticket = client.getDB(dbName).getCollection(COLLECTION_NAME_OLDTICKET);

    ticket.setObjectClass(Ticket.class);
    oldticket.setObjectClass(Ticket.class);

    ticket.setInternalClass(Ticket.FIELD_USER, User.class);
    oldticket.setInternalClass(Ticket.FIELD_USER, User.class);

    ticket.setInternalClass(Ticket.FIELD_SOURCE, User.class);
    oldticket.setInternalClass(Ticket.FIELD_SOURCE, User.class);

    ticket.setInternalClass(Ticket.FIELD_BUS, Bus.class);
    oldticket.setInternalClass(Ticket.FIELD_BUS, Bus.class);

    ticket.setInternalClass(Ticket.FIELD_SEAT, Seat.class);
    oldticket.setInternalClass(Ticket.FIELD_SEAT, Seat.class);

    for (DBObject i : new DBObject[] {
        BasicDBObjectBuilder.start(Ticket.FIELD_DATE, 1).add("seat._id", 1)
            .get(),
        BasicDBObjectBuilder.start(Ticket.FIELD_DATE, 1).add("user._id", 1)
            .get() }) {

      ticket.createIndex(i);
      oldticket.createIndex(i);
    }

    authorize = client.getDB(dbName).getCollection(COLLECTION_NAME_AUTHORIZE);
    authorize.setObjectClass(Authorize.class);

    trace = client.getDB(dbName).getCollection(COLLECTION_NAME_TRACE);
    trace.setObjectClass(Trace.class);

    trace.setInternalClass(COLLECTION_NAME_USER, User.class);

    trace.createIndex(BasicDBObjectBuilder.start(Trace.FIELD_ACTION, 1).get());
    trace.createIndex(BasicDBObjectBuilder.start("user._id", 1)
        .add(Trace.FIELD_ACTION, 1).get());

    system = client.getDB(dbName).getCollection(COLLECTION_NAME_SYSTEM);

  }

}
