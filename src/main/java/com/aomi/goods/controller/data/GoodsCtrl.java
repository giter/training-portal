package com.aomi.goods.controller.data;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.vo.RESTResponse;
import com.aomi.goods.service.GoodsService;
import com.aomi.goods.vo.GoodsPageParam;

@Controller
public class GoodsCtrl {

  @Resource
  GoodsService service;

  @ResponseBody
  @RequestMapping(value = "/data/goods.json", method = { RequestMethod.GET })
  public String get() {

    GoodsPageParam param = new GoodsPageParam();

    param.setLimit(-1);
    param.setCounting(false);
    param.setVisible(1);

    return RESTResponse.of(service.page(param)).toString();
  }
}
