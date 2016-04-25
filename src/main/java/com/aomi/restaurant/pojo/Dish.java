package com.aomi.restaurant.pojo;

import java.util.List;

import com.aomi.busorder.pojo.Basic;

public class Dish extends Basic<Dish> {

  private static final long serialVersionUID = 1L;

  /**
   * 分类
   */
  public Integer getType() {

    return getInt("type", -1);
  }

  /**
   * 标签
   * 
   * @return
   */
  @SuppressWarnings("unchecked")
  public List<String> getCates() {
    return (List<String>) get("cates");
  }

  /**
   * 菜名
   */
  public String getName() {
    return getString("name");
  }

  /**
   * 价格
   * 
   * @return
   */
  public Double getPrice() {

    return getDouble("price");
  }

  /**
   * 单位
   * 
   * @return
   */
  public String getUnit() {

    return getString("unit", "");
  }

  /**
   * 点赞数
   * 
   * @return
   */
  public int getStar() {

    return getInt("star", 0);
  }

  /**
   * 图片集
   * 
   * @return
   */
  @SuppressWarnings("unchecked")
  public List<String> getPicture() {
    return (List<String>) get("picture");
  }

  /**
   * 可见性
   * 
   * @return
   */
  public int getVisible() {
    return getInt("visible", 1);
  }

  public int getNumber() {

    return getInt("number", 0);
  }
}
