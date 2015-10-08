package com.aomi.busorder.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.aomi.busorder.param.TraceParam;
import com.aomi.busorder.pojo.Trace;
import com.aomi.busorder.pojo.Trace.TraceAction;
import com.aomi.busorder.pojo.User;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCursor;

@Service
public class TraceService {

  @Resource
  MongoDAO dao;

  public void trace(User user, TraceAction type) {

    dao.trace.insert(Trace.of(user, type));
  }

  @SuppressWarnings("unchecked")
  public List<Trace> page(TraceParam param) {

    DBCursor cursor = dao.trace.find().sort(
        BasicDBObjectBuilder.start("_id", -1).get());

    if (param != null && param.getLimit() > 0) {
      cursor.limit(param.getLimit());
    }

    if (param != null && param.getPage() > 0) {
      cursor.skip(param.getLimit() * param.getPage());
    }

    List<?> traces = cursor.limit(param.getLimit()).toArray();

    return (List<Trace>) traces;
  }

  public long count(TraceParam param) {

    return dao.trace.count();
  }

}
