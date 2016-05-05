package com.aomi.restaurant.form;

import java.util.List;

public class OrderForm {

  public String mdate;

  public String mtime;

  public Integer number;

  public String remark;

  public Long exact;

  public Integer state;

  public List<DishList> menu;

  public static class DishList {

    public String _id;

    public int number;

    public String remark;
  }
}
