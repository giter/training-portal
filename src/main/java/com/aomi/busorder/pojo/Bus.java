package com.aomi.busorder.pojo;

public class Bus extends Basic<Bus> {

  private static final long serialVersionUID = 1L;

  /**
   * 车辆名
   */
  public static final String FIELD_NAME = "name";

  /**
   * 车牌号
   */
  public static final String FIELD_SN = "sn";

  /**
   * 行数
   */
  public static final String FIELD_ROWS = "rows";

  /**
   * 列数
   */
  public static final String FIELD_COLS = "cols";

  /**
   * 发车时间
   */
  public static final String FIELD_GOFF = "goff";

  /**
   * 目的地
   */
  public static final String FIELD_DESTINATION = "destination";

  /**
   * 首字母
   */
  public static final String FIELD_CAPITAL = "capital";

  /**
   * 拼音
   */
  public static final String FIELD_PINYIN = "pinyin";

  /**
   * 座位数
   */
  public static final String FIELD_LIMIT = "limit";

  /**
   * 车辆维护标志 0 维护中 1 可用
   */
  public static final String FIELD_ONLINE = "online";

  /**
   * 车辆照片base64
   */
  public static final String FIELD_SRC = "src";

  public String getSrc(){

    return  getString(FIELD_SRC);
  }

  public String getName() {

    return getString(FIELD_NAME);
  }

  public Bus setName(String name) {

    put(FIELD_NAME, name);
    return this;
  }

  public String getSn() {

    return getString(FIELD_SN);
  }

  public Bus setSn(String sn) {

    put(FIELD_SN, sn);
    return this;
  }

  public String getCaptial() {

    return getString(FIELD_CAPITAL);
  }

  public Bus setCapital(String capital) {

    put(FIELD_CAPITAL, capital);
    return this;
  }

  public String getPinyin() {

    return getString(FIELD_PINYIN);
  }

  public Bus setPinyin(String pinyin) {

    put(FIELD_PINYIN, pinyin);
    return this;
  }

  public int getRows() {

    return getInt(FIELD_ROWS, 0);
  }

  public Bus setRows(String rows) {

    put(FIELD_ROWS, rows);
    return this;
  }

  public int getCols() {

    return getInt(FIELD_COLS, 0);
  }

  public Bus setCols(String cols) {

    put(FIELD_COLS, cols);
    return this;
  }

  public String getGoff() {

    return getString(FIELD_GOFF);
  }

  public Bus setGoff(String goff) {

    put(FIELD_GOFF, goff);
    return this;
  }

  public String getDestination() {

    return getString(FIELD_DESTINATION);
  }

  public Bus setDestination(String destination) {

    put(FIELD_DESTINATION, destination);
    return this;
  }

  public String getLimit() {

    return getString(FIELD_LIMIT);
  }

  public Bus setLimit(String limit) {

    put(FIELD_LIMIT, limit);
    return this;
  }

  public int getOnline() {

    return getInt(FIELD_ONLINE, 0);
  }

  public Bus setOnline(Integer online) {

    put(FIELD_ONLINE, online);
    return this;
  }
}
