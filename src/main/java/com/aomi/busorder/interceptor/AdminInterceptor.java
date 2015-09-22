package com.aomi.busorder.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.aomi.busorder.controller.admin.UserAdminCtrl;

public class AdminInterceptor extends HandlerInterceptorAdapter {

  @Override
  public boolean preHandle(HttpServletRequest request,
      HttpServletResponse response, Object handler) throws Exception {

    String path = request.getPathInfo();

    if (!UserAdminCtrl.PATH_ADMIN_USER_LOGIN_JSON.equals(path)) {

      if (request.getSession().getAttribute("admin") == null) {
        return false;
      }
    }

    return super.preHandle(request, response, handler);
  }
}
