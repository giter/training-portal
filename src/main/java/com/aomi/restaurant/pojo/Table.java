package com.aomi.restaurant.pojo;

import com.aomi.busorder.pojo.Basic;
import com.mongodb.DBObject;

public class Table extends Basic<Table> {

  public Table() {

    super();
    put("visible", 1);
  }

  private static final long serialVersionUID = 1L;

  /**
   * 类型
   * 
   * @return 1： 包厢 2：大厅
   */
  public int getType() {

    return getInt("type", 0);
  }

  /**
   * 编号
   * 
   * @return
   */
  public String getNo() {

    return getString("no");
  }

  public DBObject getPosition() {

    return (DBObject) get("position");
  }

  public int getVisible() {
    return getInt("visible", 1);
  }

}
