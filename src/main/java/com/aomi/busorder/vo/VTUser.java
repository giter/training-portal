package com.aomi.busorder.vo;

import com.aomi.busorder.pojo.Ticket;

public class VTUser {

  private Object user;

  private Object source;

  public VTUser() {

  }

  public VTUser(Ticket ticket) {

    this.setUser(ticket.getUser());
    this.setSource(ticket.getSource());
  }

  public Object getUser() {
    return user;
  }

  public void setUser(Object user) {
    this.user = user;
  }

  public Object getSource() {
    return source;
  }

  public void setSource(Object source) {
    this.source = source;
  }

}
