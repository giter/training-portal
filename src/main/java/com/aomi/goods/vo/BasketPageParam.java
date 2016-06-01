package com.aomi.goods.vo;

import com.aomi.busorder.param.PageParam;

public class BasketPageParam extends PageParam {

  private Integer state;
  private Integer[] states;
  private String start;
  private String end;
  private String uid;
  private String mdate;
  private String mtime;

  public Integer getState() {
    return state;
  }

  public void setState(Integer state) {
    this.state = state;
  }

  public String getStart() {
    return start;
  }

  public void setStart(String start) {
    this.start = start;
  }

  public String getEnd() {
    return end;
  }

  public void setEnd(String end) {
    this.end = end;
  }

  public String getUid() {
    return uid;
  }

  public void setUid(String uid) {
    this.uid = uid;
  }

  public String getMdate() {
    return mdate;
  }

  public void setMdate(String mdate) {
    this.mdate = mdate;
  }

  public String getMtime() {
    return mtime;
  }

  public void setMtime(String mtime) {
    this.mtime = mtime;
  }

  public Integer[] getStates() {
    return states;
  }

  public void setStates(Integer[] states) {
    this.states = states;
  }
}
