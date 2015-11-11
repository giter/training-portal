package com.aomi.busorder.pojo;

public class TicketUser {

  private User user;

  private User source;

  public TicketUser() {

  }

  public TicketUser(Ticket ticket) {

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
