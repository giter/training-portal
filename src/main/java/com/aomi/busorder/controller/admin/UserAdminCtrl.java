package com.aomi.busorder.controller.admin;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aomi.busorder.misc.Utils;
import com.aomi.busorder.param.UserParam;
import com.aomi.busorder.pojo.User;
import com.aomi.busorder.service.UserService;
import com.aomi.busorder.vo.Page;
import com.aomi.busorder.vo.RESTResponse;

@RestController
public class UserAdminCtrl {

  @Resource
  UserService service;

  @ResponseBody
  @RequestMapping(value = "/admin/data/user/{id}.json", method = { RequestMethod.GET })
  public String get(@PathVariable("id") String id) {

    return RESTResponse.of(service.get(id)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/user.json", method = { RequestMethod.POST })
  public String insert(HttpServletRequest request) throws IOException {

    User user = Utils.parseJSON(request.getInputStream(), User.class);
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
  public String pages(@RequestParam(required = false) Integer type,
      @RequestParam(required = false) String company,
      @RequestParam(required = false, defaultValue = "0") int page,
      @RequestParam(required = false, defaultValue = "10") int limit) {

    UserParam userParam = new UserParam();

    userParam.type = type;
    userParam.company = company;

    return RESTResponse
        .of(Page.of(service.count(userParam),
            service.page(userParam, page, limit))).toString();
  }

}
