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
import com.aomi.busorder.pojo.Bus;
import com.aomi.busorder.service.BusService;
import com.aomi.busorder.vo.Page;
import com.aomi.busorder.vo.RESTResponse;

@RestController
public class BusAdminCtrl {

  @Resource
  BusService service;

  @ResponseBody
  @RequestMapping(value = "/admin/data/bus/{id}.json", method = { RequestMethod.GET })
  public String get(@PathVariable("id") String id) {

    return RESTResponse.of(service.get(id)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/bus.json", method = { RequestMethod.POST })
  public String insert(HttpServletRequest request) throws IOException {

    Bus bus = Utils.parseJSON(request.getInputStream(), Bus.class);
    return RESTResponse.of(service.insert(bus)).toString();

  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/bus/{id}.json", method = { RequestMethod.PUT })
  public String save(@PathVariable("id") String id, HttpServletRequest request)
      throws IOException {

    Bus bus = Utils.parseJSON(request.getInputStream(), Bus.class);
    bus.set_id(id);

    return RESTResponse.of(service.save(bus)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/bus/{id}.json", method = { RequestMethod.DELETE })
  public String remove(@PathVariable("id") String id) {

    return RESTResponse.of(service.remove(id)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/buses.json", method = {
      RequestMethod.GET, RequestMethod.POST })
  public String pages(
      @RequestParam(required = false, defaultValue = "0") int page,
      @RequestParam(required = false, defaultValue = "10") int limit) {

    return RESTResponse.of(Page.of(service.count(), service.page(page, limit)))
        .toString();
  }

}
