package com.aomi.busorder.controller.admin;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aomi.busorder.misc.Utils;
import com.aomi.busorder.service.BusSystemContextService;
import com.aomi.busorder.vo.RESTResponse;

@RestController
public class ConfigAdminCtrl {

  @Resource
  BusSystemContextService service;

  @ResponseBody
  @RequestMapping(value = "/admin/data/ctx.json", method = { RequestMethod.PUT })
  public String context(HttpServletRequest request) throws IOException {

    BusSystemContextService.BusSystemContext bus = Utils.parseJSON(
        request.getInputStream(),
        BusSystemContextService.BusSystemContext.class);

    return RESTResponse.of(service.save(bus)).toString();
  }
}
