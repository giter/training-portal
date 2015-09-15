package com.aomi.busorder.param;

public class UserParam extends PageParam {

  private Integer type;

  private String openID;

  private String name;

  private String email;

  private String company;

  private Boolean hasCompany;

  public Integer getType() {
    return type;
  }

  public void setType(Integer type) {
    this.type = type;
  }

  public String getCompany() {
    return company;
  }

  public void setCompany(String company) {
    this.company = company;
  }

  public Boolean getHasCompany() {
    return hasCompany;
  }

  public void setHasCompany(Boolean hasCompany) {
    this.hasCompany = hasCompany;
  }

  public String getOpenID() {
    return openID;
  }

  public void setOpenID(String openID) {
    this.openID = openID;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
