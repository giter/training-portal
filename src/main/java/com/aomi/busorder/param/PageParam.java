package com.aomi.busorder.param;

import com.mongodb.DBObject;

public class PageParam {

  private int page;
  private int limit = 20;

  private DBObject sort;

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

  public DBObject getSort() {
    return sort;
  }

  public void setSort(DBObject sort) {
    this.sort = sort;
  }

}
