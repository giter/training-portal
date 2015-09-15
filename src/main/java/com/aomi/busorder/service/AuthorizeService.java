package com.aomi.busorder.service;

import javax.annotation.Resource;

import org.bson.types.ObjectId;

import com.aomi.busorder.pojo.Authorize;
import com.mongodb.BasicDBObjectBuilder;

public class AuthorizeService {

  @Resource
  MongoDAO dao;

  public Authorize get(String _id) {

    return (Authorize) dao.authorize.findOne(_id);
  }

  public Authorize take(String _id) {

    return (Authorize) dao.authorize.findAndModify(
        BasicDBObjectBuilder.start("_id", _id).get(), BasicDBObjectBuilder
            .start().push("$set").add("expiration", 0).get());
  }

  public Authorize insert(Authorize auth) {

    auth.set_id(new ObjectId().toHexString());
    auth.setCreated(System.currentTimeMillis());
    auth.setUpdated(System.currentTimeMillis());

    dao.authorize.insert(auth);
    return auth;
  }

}
