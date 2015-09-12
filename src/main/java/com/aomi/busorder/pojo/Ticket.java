package com.aomi.busorder.pojo;

import com.mongodb.BasicDBObject;

public class Ticket extends BasicDBObject {

  private static final long serialVersionUID = 1L;

  public String _id;

  /**
   * 目标车辆
   */
  public Bus bus;

  /**
   * 目标用户
   */
  public User user;
}
