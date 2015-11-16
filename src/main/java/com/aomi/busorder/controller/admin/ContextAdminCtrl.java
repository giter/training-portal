package com.aomi.busorder.controller.admin;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.IOUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aomi.busorder.service.ContextService;
import com.aomi.busorder.vo.RESTResponse;

@RestController
public class ContextAdminCtrl {

  @Resource
  ContextService service;

  @ResponseBody
  @RequestMapping(value = "/admin/data/ctx.json", method = { RequestMethod.PUT })
  public String context(HttpServletRequest request) throws IOException {

    return RESTResponse.of(
        service.save(IOUtils.toString(request.getInputStream()))).toString();
  }
}
