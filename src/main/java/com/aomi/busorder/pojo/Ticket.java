package com.aomi.busorder.pojo;

public class Ticket extends Basic<Ticket> {

  private static final long serialVersionUID = 1L;

  public static final String FIELD_DATE = "date";

  public static final String FIELD_BUS = "bus";

  public static final String FIELD_USER = "user";

  public static final String FIELD_SEAT = "seat";

  public String getDate() {
    return getString(FIELD_DATE);
  }

  public Ticket setDate(String date) {

    put(FIELD_DATE, date);
    return this;
  }

  public Ticket setBus(Bus bus) {
    put(FIELD_BUS, bus);
    return this;
  }

  public Bus getBus() {
    return (Bus) get(FIELD_BUS);
  }

  public Ticket setUser(User user) {
    put(FIELD_USER, user);
    return this;
  }

  public User getUser() {
    return (User) get(FIELD_USER);
  }

  public Ticket setSeat(Seat seat) {
    put(FIELD_SEAT, seat);
    return this;
  }

  public Seat getSeat() {
    return (Seat) get(FIELD_SEAT);
  }

}
