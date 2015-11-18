package com.aomi.busorder.controller.admin;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.form.LoginForm;
import com.aomi.busorder.misc.Utils;
import com.aomi.busorder.param.UserParam;
import com.aomi.busorder.pojo.Trace.TraceAction;
import com.aomi.busorder.pojo.User;
import com.aomi.busorder.service.TraceService;
import com.aomi.busorder.service.UserService;
import com.aomi.busorder.vo.Page;
import com.aomi.busorder.vo.RESTResponse;

@Controller
public class UserAdminCtrl {

  public static final String PATH_ADMIN_USER_LOGIN_JSON = "/admin/user/login.json";

  @Resource
  UserService service;

  @Resource
  TraceService tracer;

  @RequestMapping(value = PATH_ADMIN_USER_LOGIN_JSON, method = { RequestMethod.POST })
  public String adminUserLogin(@ModelAttribute LoginForm form,
      HttpSession session) {

    User user = service.getByAccount(form.getEmail(), form.getPassword());

    if (user == null
        || (user.getAdmin() != User.TYPE_ORDER && user.getAdmin() != User.TYPE_ADMIN)) {
      return "redirect:/admin/login.html";
    }

    tracer.trace(user, TraceAction.ACTION_ADMIN_LOGIN);

    session.setAttribute("admin", user.get_id());

    return "redirect:/admin/index.html?" + user.getType();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/user/{id}.json", method = { RequestMethod.GET })
  public String get(@PathVariable("id") String id) {

    return RESTResponse.of(service.get(id)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/user.json", method = { RequestMethod.POST })
  public String insert(HttpServletRequest request, HttpSession session)
      throws IOException {

    User user = Utils.parseJSON(request.getInputStream(), User.class);
    user.setCreator(session.getAttribute("admin").toString());

    return RESTResponse.of(service.insert(user)).toString();

  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/user/{id}.json", method = { RequestMethod.PUT })
  public String save(@PathVariable("id") String id, HttpServletRequest request)
      throws IOException {

    User user = Utils.parseJSON(request.getInputStream(), User.class);
    user.set_id(id);

    return RESTResponse.of(service.save(user)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/user/{id}.json", method = { RequestMethod.DELETE })
  public String remove(@PathVariable("id") String id) {

    return RESTResponse.of(service.remove(id)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/users.json", method = {
      RequestMethod.GET, RequestMethod.POST })
  public String pages(@ModelAttribute UserParam userParam, HttpSession session) {

    if (userParam.getCompany() != null) {
      userParam.setCreator(session.getAttribute("admin").toString());
    }

    return RESTResponse.of(
        Page.of(service.count(userParam), service.page(userParam))).toString();
  }

}
