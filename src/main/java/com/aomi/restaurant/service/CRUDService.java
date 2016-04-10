package com.aomi.restaurant.service;

import java.util.List;

import org.bson.types.ObjectId;

import com.aomi.busorder.param.PageParam;
import com.aomi.busorder.pojo.Basic;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

public abstract class CRUDService<T extends Basic<T>, Q extends PageParam> {

  public abstract DBCollection collection();

  public abstract Class<T> clazz();

  public abstract DBObject query(Q param);

  @SuppressWarnings("unchecked")
  public T get(String _id) {

    return (T) collection().findOne(_id);
  }

  public T insert(T t) {

    t.set_id(new ObjectId().toHexString());
    t.setUpdated(System.currentTimeMillis());
    t.setCreated(System.currentTimeMillis());

    collection().insert(t);

    return t;
  }

  public T update(T t) {

    t.setUpdated(System.currentTimeMillis());
    collection().save(t);

    return t;
  }

  public void delete(String _id) {

    collection().remove(new BasicDBObject("_id", _id));
  }

  public long count(DBObject query) {

    return collection().count(query);
  }

  @SuppressWarnings("unchecked")
  public List<T> page(Q param) {

    DBCursor cursor = collection().find(query(param));

    if (param != null && param.getLimit() > 0) {
      cursor.limit(param.getLimit());
    }

    if (param != null && param.getPage() > 0) {
      cursor.skip(param.getLimit() * param.getPage());
    }

    if (param != null && param.getSort() != null) {
      cursor.sort(param.getSort());
    }

    return (List<T>) cursor.toArray();
  }
}
