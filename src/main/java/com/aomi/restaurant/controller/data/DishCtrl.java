package com.aomi.restaurant.controller.data;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.vo.RESTResponse;
import com.aomi.restaurant.service.DishService;
import com.aomi.restaurant.vo.DishPageParam;

@Controller
public class DishCtrl {

  @Resource
  DishService service;

  @ResponseBody
  @RequestMapping(value = "/data/dishes.json", method = { RequestMethod.GET })
  public String get() {

    DishPageParam param = new DishPageParam();

    param.setLimit(-1);
    param.setCounting(false);
    param.setVisible(1);

    return RESTResponse.of(service.page(param)).toString();
  }
}
