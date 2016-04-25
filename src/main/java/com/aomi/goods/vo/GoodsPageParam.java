package com.aomi.goods.vo;

import com.aomi.busorder.param.PageParam;

public class GoodsPageParam extends PageParam {

  private Integer visible;
  private String like;
  private Integer type;
  private String name;

  public Integer getVisible() {
    return visible;
  }

  public void setVisible(Integer visible) {
    this.visible = visible;
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

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
