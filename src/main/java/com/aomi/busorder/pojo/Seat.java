package com.aomi.busorder.pojo;

public class Seat extends Basic<Seat> {

  private static final long serialVersionUID = 1L;

  /**
   * BUS ID
   */
  public static final String FIELD_BUS = "bus";

  /**
   * 座名
   */
  public static final String FIELD_NAME = "name";

  /**
   * 座号
   */
  public static final String FIELD_SN = "sn";

  /**
   * 列号
   */
  public static final String FIELD_COL = "col";

  /**
   * 行号
   */
  public static final String FIELD_ROW = "row";

  /**
   * 状态, 0 不可用 1 可用
   */
  public static final String FIELD_STATE = "state";

  public String getName() {

    return getString(FIELD_NAME);
  }

  public Seat setName(String name) {

    put(FIELD_NAME, name);
    return this;
  }

  public String getSn() {

    return getString(FIELD_SN);
  }

  public Seat setSn(String sn) {

    put(FIELD_SN, sn);
    return this;
  }

  public String getBus() {

    return getString(FIELD_BUS);
  }

  public Seat setBus(String bus) {

    put(FIELD_BUS, bus);
    return this;
  }

  public int getRow() {

    return getInt(FIELD_ROW, 0);
  }

  public Seat setRow(String row) {

    put(FIELD_ROW, row);
    return this;
  }

  public int getCol() {

    return getInt(FIELD_COL, 0);
  }

  public Seat setCols(String col) {

    put(FIELD_COL, col);
    return this;
  }

  public int getState() {

    return getInt(FIELD_STATE, 0);
  }

  public Seat setState(int state) {

    put(FIELD_STATE, state);
    return this;
  }
}
