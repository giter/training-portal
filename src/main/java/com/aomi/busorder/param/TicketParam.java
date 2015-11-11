package com.aomi.busorder.param;

public class TicketParam extends PageParam {

  private String uid;

  private String by;

  private String date;

  private String begin;

  private String end;

  private String company;

  public String getUid() {
    return uid;
  }

  public void setUid(String uid) {
    this.uid = uid;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getCompany() {
    return company;
  }

  public void setCompany(String company) {
    this.company = company;
  }

  public String getBy() {
    return by;
  }

  public void setBy(String by) {
    this.by = by;
  }

  public String getBegin() {
    return begin;
  }

  public void setBegin(String begin) {
    this.begin = begin;
  }

  public String getEnd() {
    return end;
  }

  public void setEnd(String end) {
    this.end = end;
  }
}
