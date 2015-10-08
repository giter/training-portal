package com.aomi.busorder.controller.admin;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.param.TraceParam;
import com.aomi.busorder.service.TraceService;
import com.aomi.busorder.vo.Page;
import com.aomi.busorder.vo.RESTResponse;

@Controller
public class TraceAdminCtrl {

  @Resource
  TraceService service;

  @ResponseBody
  @RequestMapping(value = "/admin/data/traces.json", method = {
      RequestMethod.GET, RequestMethod.POST })
  public String pages(@ModelAttribute TraceParam pageParam) {

    return RESTResponse.of(
        Page.of(service.count(pageParam), service.page(pageParam))).toString();
  }
}
