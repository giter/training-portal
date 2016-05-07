package com.aomi.restaurant.controller.data;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.vo.RESTResponse;
import com.aomi.restaurant.service.PackService;
import com.aomi.restaurant.vo.PackPageParam;

@Controller
public class PackCtrl {

  @Resource
  PackService service;

  @ResponseBody
  @RequestMapping(value = "/data/packs.json", method = { RequestMethod.GET })
  public String get(
      @RequestParam(value = "number", required = false) Integer number) {

    PackPageParam param = new PackPageParam();

    param.setLimit(-1);
    param.setCounting(false);
    param.setNumber(number);

    return RESTResponse.of(service.page(param)).toString();
  }
}
