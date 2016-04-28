package com.aomi.restaurant.form;

import java.util.List;

public class ListDishForm {

  public List<DishForm> dishes;

  public static class DishForm {

    public String id;

    public int number;

    public String remark;
  }
}
