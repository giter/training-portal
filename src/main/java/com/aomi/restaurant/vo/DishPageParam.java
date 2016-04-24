package com.aomi.restaurant.vo;

import com.aomi.busorder.param.PageParam;

public class DishPageParam extends PageParam {

  private String name;

  private String prefix;

  private String type;

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

  public String getPrefix() {
    return prefix;
  }

  public void setPrefix(String prefix) {
    this.prefix = prefix;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }
}
