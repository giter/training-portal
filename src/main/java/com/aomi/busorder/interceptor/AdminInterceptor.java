package com.aomi.busorder.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.aomi.busorder.controller.admin.UserAdminCtrl;

public class AdminInterceptor extends HandlerInterceptorAdapter {

  static Logger LOGGER = LoggerFactory.getLogger(AdminInterceptor.class);

  @Override
  public boolean preHandle(HttpServletRequest request,
      HttpServletResponse response, Object handler) throws Exception {

    String path = request.getPathInfo();

    if (!UserAdminCtrl.PATH_ADMIN_USER_LOGIN_JSON.equals(path)) {

      if (request.getSession().getAttribute("admin") == null) {

        if (path != null && path.endsWith(".html")) {
          response.sendRedirect("/admin/login.html");
        } else {

          LOGGER.warn(String.format("Request reach bad point at %s %s ",
              request.getMethod(), request.getRequestURL()));
          response.sendError(400, "Not login.");
        }

        return false;
      }
    }

    return super.preHandle(request, response, handler);
  }
}
