package com.aomi.busorder.form;

import org.springframework.beans.factory.annotation.Required;

public class LoginForm {

  private String email;
  private String password;
  private String redirect;

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

  public String getRedirect() {
    return redirect;
  }

  public void setRedirect(String redirect) {
    this.redirect = redirect;
  }
}
