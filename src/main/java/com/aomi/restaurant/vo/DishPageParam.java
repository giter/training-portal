package com.aomi.restaurant.vo;

import com.aomi.busorder.param.PageParam;

public class DishPageParam extends PageParam {

  private String name;

  private String like;

  private Integer type;

  private Integer visible;

  public Integer getVisible() {
    return visible;
  }

  public void setVisible(Integer visible) {
    this.visible = visible;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getLike() {
    return like;
  }

  public void setLike(String like) {
    this.like = like;
  }

  public Integer getType() {
    return type;
  }

  public void setType(Integer type) {
    this.type = type;
  }
}
