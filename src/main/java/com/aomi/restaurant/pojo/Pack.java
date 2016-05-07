package com.aomi.restaurant.pojo;

import java.util.List;

import com.aomi.busorder.pojo.Basic;

public class Pack extends Basic<Pack> {

  private static final long serialVersionUID = 1L;

  public int getNumber() {

    return getInt("number", 0);
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
