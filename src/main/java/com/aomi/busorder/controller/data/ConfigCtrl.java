package com.aomi.busorder.controller.data;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
  public String context(
      @RequestParam(value = "app", defaultValue = "context") String app) {

    return RESTResponse.of(service.get(app)).toString();
  }
}
