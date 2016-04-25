package com.aomi.busorder.param;

import com.mongodb.DBObject;

public class PageParam {

  private boolean counting = true;
  private int page;
  private int limit = 20;

  private DBObject sort;

  private String sorts;

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

  public boolean isCounting() {
    return counting;
  }

  public void setCounting(boolean counting) {
    this.counting = counting;
  }

  public String getSorts() {
    return sorts;
  }

  public void setSorts(String sorts) {
    this.sorts = sorts;
  }

}
