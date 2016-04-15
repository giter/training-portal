package com.aomi.restaurant.form;

import java.util.List;

public class OrderForm {

  public String mdate;

  public String mtime;

  public Double number;

  public List<DishList> menu;

  public static class DishList {

    public String _id;

    public int number;
  }
}
