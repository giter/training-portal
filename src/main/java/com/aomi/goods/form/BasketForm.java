package com.aomi.goods.form;

import java.util.List;

public class BasketForm {

  public String mdate;
  public Integer number;

  public List<GoodsList> items;

  public static class GoodsList {

    public String _id;

    public int number;
  }

}