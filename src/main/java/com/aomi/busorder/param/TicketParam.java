package com.aomi.busorder.param;

import org.apache.commons.lang3.tuple.Pair;

public class TicketParam extends PageParam {

  private boolean old;

  private String uid;

  private String by;

  private String date;

  private String begin;

  private String end;

  private String company;

  private Pair<String, String> overlapping;

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

  public Pair<String, String> getOverlapping() {
    return overlapping;
  }

  public void setOverlapping(Pair<String, String> overlapping) {
    this.overlapping = overlapping;
  }

  public boolean isOld() {
    return old;
  }

  public void setOld(boolean old) {
    this.old = old;
  }
}
