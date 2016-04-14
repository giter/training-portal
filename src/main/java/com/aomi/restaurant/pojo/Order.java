package com.aomi.restaurant.pojo;

import java.util.List;

import com.aomi.busorder.pojo.Basic;
import com.aomi.busorder.pojo.User;

public class Order extends Basic<Order> {

  public Order() {

    super();

    put("state", 1);
    put("number", 0);
  }

  private static final long serialVersionUID = 1L;

  public User getUser() {

    return (User) get("user");
  }

  public String getMdate() {

    return getString("mdate");
  }

  public String getMtime() {

    return getString("mtime");
  }

  public int getNumber() {

    return getInt("number");
  }

  public Table getTable() {

    return (Table) get("table");
  }

  @SuppressWarnings("unchecked")
  public List<Dish> getMenu() {

    return (List<Dish>) get("menu");
  }

  /**
   * 状态
   * 
   * @return 1：正常 -1：取消
   */
  public int getState() {

    return getInt("state", 1);
  }
}
