package com.aomi.busorder.pojo;

public class User extends Basic<User> {

  private static final long serialVersionUID = 1L;

  /**
   * 用户类型 0. 普通用户 1. 外包用户
   */
  public static final String FIELD_UTYPE = "utype";

  /**
   * 外包商
   */
  public static final String FIELD_COMPANY = "company";

  /**
   * 邮箱
   */
  public static final String FIELD_EMAIL = "email";

  /**
   * 密码
   */
  public static final String FIELD_PASSWORD = "password";

  /**
   * 姓名
   */
  public static final String FIELD_NAME = "name";

  /**
   * 手机
   */
  public static final String FIELD_MOBILE = "mobile";

  /**
   * OpenID
   */
  public static final String FIELD_OPEN_ID = "openID";

  /**
   * 日订票限制
   */
  public static final String FIELD_LIMIT = "limit";

  /**
   * 管理员标志
   */
  public static final String FIELD_ADMIN = "admin";

  public String getUtype() {

    return getString(FIELD_UTYPE);
  }

  public User setUtype(String utype) {
    put(FIELD_UTYPE, utype);
    return this;
  }

  public String getCompany() {

    return getString(FIELD_COMPANY);
  }

  public User setCompany(String company) {
    put(FIELD_COMPANY, company);
    return this;
  }

  public String getName() {

    return getString(FIELD_NAME);
  }

  public User setName(String name) {
    put(FIELD_NAME, name);
    return this;
  }

  public String getMobile() {

    return getString(FIELD_MOBILE);
  }

  public User setMobile(String mobile) {
    put(FIELD_MOBILE, mobile);
    return this;
  }

  public String getEmail() {

    return getString(FIELD_EMAIL);
  }

  public User setEmail(String email) {
    put(FIELD_EMAIL, email);
    return this;
  }

  public String getPassword() {

    return getString(FIELD_PASSWORD);
  }

  public User setPassword(String password) {
    put(FIELD_PASSWORD, password);
    return this;
  }

  public String getOpenID() {

    return getString(FIELD_OPEN_ID);
  }

  public User setOpenID(String openID) {

    put(FIELD_OPEN_ID, openID);
    return this;
  }

  /**
   * 日订票限制
   */
  public int getLimit() {

    return getInt(FIELD_LIMIT, (getAdmin() == 1) ? 999999 : 0);
  }

  public User setLimit(int limit) {

    put(FIELD_LIMIT, limit);
    return this;
  }

  /***
   * 管理员标志
   */
  public int getAdmin() {

    return getInt(FIELD_ADMIN, 0);
  }

  public User setAdmin(int admin) {

    put(FIELD_ADMIN, admin);
    return this;
  }

}
