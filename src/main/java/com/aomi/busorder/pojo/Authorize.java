package com.aomi.busorder.pojo;

public class Authorize extends Basic<Authorize> {

  private static final long serialVersionUID = 1L;

  /**
   * OpenID
   */
  public static final String FIELD_OPENID = "openID";

  /**
   * 姓名
   */
  public static final String FIELD_NAME = "name";

  /**
   * 邮箱
   */
  public static final String FIELD_EMAIL = "email";

  /**
   * 过期时间
   */
  public static final String FIELD_EXPIRATION = "expiration";

  /**
   * UID
   */
  public static final String FIELD_UID = "uid";

  public String getUid() {

    return getString(FIELD_UID);
  }

  public Authorize setUid(String uid) {
    put(FIELD_UID, uid);
    return this;
  }

  public String getName() {

    return getString(FIELD_NAME);
  }

  public Authorize setName(String name) {
    put(FIELD_NAME, name);
    return this;
  }

  public String getEmail() {

    return getString(FIELD_EMAIL);
  }

  public Authorize setEmail(String email) {
    put(FIELD_EMAIL, email);
    return this;
  }

  public long getExpiration() {

    return getLong(FIELD_EXPIRATION, 0);
  }

  public Authorize setExpiration(Long expiration) {
    put(FIELD_EXPIRATION, expiration);
    return this;
  }

  public String getOpenID() {

    return getString(FIELD_OPENID);
  }

  public Authorize setOpenID(String openID) {

    put(FIELD_OPENID, openID);
    return this;
  }

}
