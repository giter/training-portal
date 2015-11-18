package com.aomi.busorder.pojo;

import java.util.List;

import com.mongodb.BasicDBList;

public class User extends Basic<User> {

  private static final long serialVersionUID = 1L;

  public static final int TYPE_NORMAL = 0;
  public static final int TYPE_COMPANY = 1;
  public static final int TYPE_RELATION = 2;
  public static final int TYPE_ORDER = 3;

  /**
   * 用户类型 0. 普通用户 1. 外包用户 2. 关联用户
   */
  public static final String FIELD_TYPE = "type";

  /**
   * 外包商
   */
  public static final String FIELD_COMPANY = "company";

  /***
   * 单位
   */
  public static final String FIELD_UNIT = "unit";

  /***
   * 处室
   */
  public static final String FIELD_DEPARTMENT = "department";

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
  public static final String FIELD_OPENID = "openID";

  /**
   * 日订票限制
   */
  public static final String FIELD_LIMIT = "limit";

  /**
   * 管理员标志
   */
  public static final String FIELD_ADMIN = "admin";

  /***
   * 授信人
   */
  public static final String FIELD_DELEGATION = "delegation";

  /***
   * 身份证
   */
  public static final String FIELD_SN = "sn";

  /***
   * 性别
   */
  public static final String FIELD_SEX = "sex";

  /***
   * 年龄
   */
  public static final String FIELD_AGE = "age";

  /***
   * 关系
   */
  public static final String FIELD_RELATION = "relation";

  /***
   * 关联到
   */
  public static final String FIELD_RELATED = "related";

  /***
   * 创建人
   */
  public static final String FIELD_CREATOR = "creator";

  public int getType() {

    return getInt(FIELD_TYPE, 0);
  }

  public User setType(int type) {
    put(FIELD_TYPE, type);
    return this;
  }

  public String getDepartment() {

    return getString(FIELD_DEPARTMENT);
  }

  public User setDepartment(String department) {
    put(FIELD_DEPARTMENT, department);
    return this;
  }

  public String getCreator() {

    return getString(FIELD_CREATOR);
  }

  public User setCreator(String creator) {
    put(FIELD_CREATOR, creator);
    return this;
  }

  public String getUnit() {

    return getString(FIELD_UNIT);
  }

  public User setUnit(String unit) {
    put(FIELD_UNIT, unit);
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

  @SuppressWarnings("unchecked")
  public List<String> getDelegation() {

    Object lists = get(FIELD_DELEGATION);
    return (List<String>) (lists == null ? new BasicDBList() : lists);
  }

  public User setDelegation(List<String> delegation) {

    put(FIELD_DELEGATION, delegation);
    return this;
  }

  public User delegate(String uid) throws ArrayIndexOutOfBoundsException {

    List<String> delegation = getDelegation();

    if (delegation.size() < 5)
      delegation.add(uid);
    else
      throw new ArrayIndexOutOfBoundsException(5);

    setDelegation(delegation);

    return this;
  }

  public User undelegate(String uid) throws ArrayIndexOutOfBoundsException {

    List<String> delegation = getDelegation();
    delegation.remove(uid);
    setDelegation(delegation);

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

  public String getSn() {

    return getString(FIELD_SN);
  }

  public User setSn(String sn) {
    put(FIELD_SN, sn);
    return this;
  }

  public String getSex() {

    return getString(FIELD_SEX);
  }

  public User setSex(String sex) {
    put(FIELD_SEX, sex);
    return this;
  }

  public String getAge() {

    return getString(FIELD_AGE);
  }

  public User setAge(String age) {
    put(FIELD_AGE, age);
    return this;
  }

  public String getRelated() {

    return getString(FIELD_RELATED);
  }

  public User setRelated(String related) {
    put(FIELD_RELATED, related);
    return this;
  }

  public String getOpenID() {

    return getString(FIELD_OPENID);
  }

  public User setOpenID(String openID) {

    put(FIELD_OPENID, openID);
    return this;
  }

  /**
   * 日订票限制
   */
  public int getLimit() {

    return getInt(FIELD_LIMIT, (getAdmin() == 1) ? 999999 : 1);
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

  public String getRelation() {

    return getString(FIELD_RELATION);
  }

  public User setRelation(String relation) {

    put(FIELD_RELATION, relation);
    return this;
  }

}
