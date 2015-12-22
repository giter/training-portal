package com.aomi.busorder.pojo;

public class Dept extends Basic<Bus> {

  private static final long serialVersionUID = 1L;

  /**
   * id
   */
  public static final String FIELD_ID = "id";

  /**
   * 上级部门
   */
  public static final String FIELD_PID = "pid";

  /**
   * 名称
   */
  public static final String FIELD_NAME = "name";

  /**
   * 是否展开
   */
  public static final String FIELD_OPEN = "open";

  /**
   * 
   */
  public static final String FIELD_LEVEL = "level";
  





  public String getName() {

    return getString(FIELD_NAME);
  }

  public Dept setName(String name) {

    put(FIELD_NAME, name);
    return this;
  }

  public String getId() {

    return getString(FIELD_ID);
  }

  public Dept setId(String id) {

    put(FIELD_ID, id);
    return this;
  }

  public String getPid() {

    return getString(FIELD_PID);
  }

  public Dept setPid(String pid) {

    put(FIELD_PID, pid);
    return this;
  }

  public Boolean getOpen() {

    return getBoolean(FIELD_OPEN);
  }

  public Dept setPinyin(Boolean open) {

    put(FIELD_OPEN, open);
    return this;
  }

  public int getLevel() {

    return getInt(FIELD_LEVEL, 0);
  }

  public Dept setRows(Integer level) {

    put(FIELD_LEVEL, level);
    return this;
  }

  
}
