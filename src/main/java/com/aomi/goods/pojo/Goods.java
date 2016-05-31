package com.aomi.goods.pojo;

import java.util.List;

import com.aomi.busorder.pojo.Basic;

public class Goods extends Basic<Goods> {

  private static final long serialVersionUID = 1L;

  @SuppressWarnings("unchecked")
  public List<Integer> getType() {

    return (List<Integer>) get("type");
  }

  public Double getPrice() {
    return getDouble("price", 0.0);
  }

  public String getName() {
    return getString("name");
  }

  public String getUnit() {
    return getString("unit");
  }

  @SuppressWarnings("unchecked")
  public List<String> getPicture() {

    return (List<String>) get("picture");
  }

  public int getVisible() {

    return getInt("visible", 1);
  }

  public int getNumber() {

    return getInt("number", 0);
  }

}
