package com.aomi.restaurant.pojo;

import com.aomi.busorder.pojo.Basic;
import com.mongodb.BasicDBObject;

public class Table extends Basic<Table> {

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

  public Position getPosition() {

    return (Position) get("position");
  }

  public int getVisible() {
    return getInt("visible", 1);
  }

  public static class Position extends BasicDBObject {

    private static final long serialVersionUID = 1L;

    public int getX() {

      return getInt("x", 0);
    }

    public int getY() {

      return getInt("y", 0);
    }

  }

}
