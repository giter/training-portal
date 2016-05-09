package com.aomi.goods.pojo;

import java.util.List;

import com.aomi.busorder.pojo.Basic;
import com.aomi.busorder.pojo.User;

public class Basket extends Basic<Basket> {

  private static final long serialVersionUID = 1L;

  @SuppressWarnings("unchecked")
  public List<Goods> getItems() {

    return (List<Goods>) get("items");
  }

  public int getNumber() {
    return getInt("number", 0);
  }

  public String getMdate() {
    return getString("mdate");
  }

  public String getMtime() {
    return getString("mtime");
  }

  public User getUser() {

    return (User) get("user");
  }

  public int getState() {

    return getInt("state", 1);
  }
}
