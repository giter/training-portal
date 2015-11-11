package com.aomi.busorder.vo;

import com.aomi.busorder.pojo.Ticket;
import com.aomi.busorder.pojo.User;

public class VTUser {

  private User user;

  private User source;

  public VTUser() {

  }

  public VTUser(Ticket ticket) {

    this.setUser(user);
    this.setSource(getSource());
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public User getSource() {
    return source;
  }

  public void setSource(User source) {
    this.source = source;
  }

}
