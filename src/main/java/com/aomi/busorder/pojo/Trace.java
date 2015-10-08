package com.aomi.busorder.pojo;

import org.bson.types.ObjectId;

/**
 * @author Lijiajie
 * 
 */
public class Trace extends Basic<Trace> {

  private static final long serialVersionUID = 1L;

  public static final String FIELD_ACTION = "action";

  public static final String FIELD_USER = "user";

  public Trace() {
    super();
  }

  public Trace(User user, TraceAction action) {

    super();

    set_id(new ObjectId().toHexString());

    setUser(user);
    setAction(action);

    setCreated(System.currentTimeMillis());
    setUpdated(System.currentTimeMillis());
  }

  public Trace setUser(User user) {
    put(FIELD_USER, user);
    return this;
  }

  public User getUser() {
    return (User) get(FIELD_USER);
  }

  public int getAction() {

    return getInt(FIELD_ACTION);
  }

  public Trace setAction(TraceAction action) {

    put(FIELD_ACTION, action.val);
    return this;
  }

  public Trace setAction(int action) {

    put(FIELD_ACTION, action);
    return this;
  }

  public static Trace of(User user, TraceAction action) {

    return new Trace(user, action);
  }

  public static enum TraceAction {

    /**
     * 管理员登录
     */
    ACTION_ADMIN_LOGIN(1),

    /**
     * 前端登录
     */
    ACTION_LOGIN(10000);

    ;

    private final int val;

    private TraceAction(int type) {
      this.val = type;
    }

    @Override
    public String toString() {
      return Integer.toString(val);
    }

  }

}
