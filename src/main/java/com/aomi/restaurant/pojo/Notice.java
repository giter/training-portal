package com.aomi.restaurant.pojo;

import com.aomi.busorder.pojo.Basic;
import com.aomi.busorder.pojo.User;

public class Notice extends Basic<Notice> {

  private static final long serialVersionUID = 1L;

  /**
   * 标题
   */
  public String getTitle() {
    return getString("title");
  }

  /**
   * 内容
   */
  public String getContent() {

    return getString("content");
  }

  /**
   * 时间
   */
  public String getTime() {

    return getString("time");
  }

  /**
   * 置顶
   */
  public int getTop() {

    return getInt("top", 0);
  }

  /**
   * 可见性
   */
  public int getVisible() {

    return getInt("visible", 1);
  }

  /**
   * 创建者
   * 
   * @return
   */
  public User getUser() {
    return (User) get("user");
  }

}
