package com.aomi.busorder.service;

import java.io.IOException;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mongodb.DBObject;
import com.mongodb.util.JSON;

@Service
public class ContextService {

  @Resource
  MongoDAO dao;

  public Object get() {

    return dao.system.findOne("context");
  }

  public synchronized Object save(Object context) throws IOException {

    DBObject parsed = (DBObject) JSON.parse(JSON.serialize(context));
    parsed.put("_id", "context");

    dao.system.save(parsed);

    return context;
  }
}
