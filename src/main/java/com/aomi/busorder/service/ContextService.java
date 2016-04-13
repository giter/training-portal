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

  public Object get(String app) {

    return dao.system.findOne(app);
  }

  public synchronized DBObject save(String app, String context)
      throws IOException {

    DBObject parsed = (DBObject) JSON.parse(context);
    parsed.put("_id", app);

    dao.system.save(parsed);

    return parsed;
  }
}
