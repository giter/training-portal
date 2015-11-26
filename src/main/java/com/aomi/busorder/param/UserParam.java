package com.aomi.busorder.param;

public class UserParam extends PageParam {

  private Integer type;

  private String openID;

  private String name;

  private String email;

  private String unit;

  private String department;

  private String creator;

  private String company;

  private String delegateTo;

  private String relatedTo;

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

  public String getUnit(){
    return  unit;
  }

  public void setUnit(String unit){
    this.unit = unit;
  }

  public String getDepartment(){
    return  department;
  }
  public void setDepartment(String department){
    this.department = department;
  }


  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getDelegateTo() {
    return delegateTo;
  }

  public void setDelegateTo(String delegateTo) {
    this.delegateTo = delegateTo;
  }

  public String getRelatedTo() {
    return relatedTo;
  }

  public void setRelatedTo(String relatedTo) {
    this.relatedTo = relatedTo;
  }

  public String getCreator() {
    return creator;
  }

  public void setCreator(String creator) {
    this.creator = creator;
  }
}
