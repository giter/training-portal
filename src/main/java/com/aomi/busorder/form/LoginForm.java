package com.aomi.busorder.form;

import org.springframework.beans.factory.annotation.Required;

public class LoginForm {

  private String email;
  private String password;

  public String getEmail() {
    return email;
  }

  @Required
  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  @Required
  public void setPassword(String password) {
    this.password = password;
  }
}
