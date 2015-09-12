package com.aomi.busorder.vo;

import java.util.List;

public class Page<T> {

  public long count;
  public List<T> lists;

  public static <V> Page<V> of(long count, List<V> lists) {

    Page<V> page = new Page<>();

    page.count = count;
    page.lists = lists;

    return page;
  }
}
