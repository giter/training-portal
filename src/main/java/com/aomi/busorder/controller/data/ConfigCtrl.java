package com.aomi.busorder.controller.data;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aomi.busorder.service.ContextService;
import com.aomi.busorder.vo.RESTResponse;

@RestController
public class ConfigCtrl {

  @Resource
  ContextService service;

  @ResponseBody
  @RequestMapping(value = "/data/ctx.json", method = { RequestMethod.GET })
  public String context() {

    return RESTResponse.of(service.get()).toString();
  }
}
