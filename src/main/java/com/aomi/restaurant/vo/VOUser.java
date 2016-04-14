package com.aomi.restaurant.vo;

import com.aomi.busorder.pojo.User;

public class VOUser {

  private User user;

  public VOUser(User user) {
    this.user = user;
  }

  public String get_id() {
    return user.get_id();
  }

  public String getName() {
    return user.getName();
  }
}
