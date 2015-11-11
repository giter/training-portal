package com.aomi.busorder.param;

public class PageParam {

  private int page;
  private int limit = 20;

  public int getPage() {
    return page;
  }

  public void setPage(int page) {
    this.page = page;
  }

  public int getLimit() {
    return limit;
  }

  public void setLimit(int limit) {
    this.limit = limit;
  }

}
