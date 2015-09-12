package com.aomi.busorder.pojo;

import com.mongodb.BasicDBObject;

public class Basic<T extends Basic<T>> extends BasicDBObject {

  private static final long serialVersionUID = 1L;

  public static final String FIELD_ID = "_id";

  public static final String FIELD_CREATED = "created";
  public static final String FIELD_UPDATED = "updated";

  public String get_id() {

    return getString(FIELD_ID);
  }

  @SuppressWarnings("unchecked")
  public T set_id(String _id) {
    put(FIELD_ID, _id);
    return (T) this;
  }

  public Long getCreated() {
    return getLong("created");
  }

  @SuppressWarnings("unchecked")
  public T setCreated(long created) {

    put("created", created);
    return (T) this;
  }

  public Long getUpdated() {
    return getLong("updated");
  }

  @SuppressWarnings("unchecked")
  public T setUpdated(long updated) {

    put("updated", updated);
    return (T) this;
  }
}
