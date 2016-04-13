package com.aomi.restaurant.controller.admin;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.misc.Utils;
import com.aomi.busorder.param.PageParam;
import com.aomi.busorder.pojo.Basic;
import com.aomi.busorder.vo.Page;
import com.aomi.busorder.vo.RESTResponse;
import com.aomi.restaurant.service.CRUDService;
import com.mongodb.DBObject;

public abstract class CRUDAdminCtrl<T extends Basic<T>, Q extends PageParam> {

  public abstract CRUDService<T, Q> service();

  @ResponseBody
  @RequestMapping(value = "/{id}.json", method = { RequestMethod.GET })
  public String get(@PathVariable("id") String id) {

    return RESTResponse.of(service().get(id)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/insert.json", method = { RequestMethod.POST })
  public String insert(HttpServletRequest request, HttpSession session)
      throws IOException {

    T t = Utils.parseJSON(request.getInputStream(), service().clazz());

    return RESTResponse.of(service().insert(t)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/{id}.json", method = { RequestMethod.PUT })
  public String save(@PathVariable("id") String id, HttpServletRequest request)
      throws IOException {

    T t = Utils.parseJSON(request.getInputStream(), service().clazz());

    return RESTResponse.of(service().update(t)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/{id}.json", method = { RequestMethod.DELETE })
  public String remove(@PathVariable("id") String _id) throws Exception {

    service().delete(_id);

    return RESTResponse.of(_id).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/items.json", method = { RequestMethod.GET,
      RequestMethod.POST })
  public String pages(@ModelAttribute Q param) {

    DBObject query = service().query(param);

    Long count = null;

    if (param.isCounting()) {
      count = service().count(query);
    }

    return RESTResponse.of(Page.of(count, service().page(param))).toString();
  }
}
