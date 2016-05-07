package com.aomi.restaurant.controller.admin;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aomi.restaurant.pojo.Pack;
import com.aomi.restaurant.service.OrderService;
import com.aomi.restaurant.service.PackService;
import com.aomi.restaurant.vo.PackPageParam;

@Controller
@RequestMapping("/admin/data/pack")
public class PackAdminCtrl extends CRUDAdminCtrl<Pack, PackPageParam> {

  @Resource
  PackService service;

  @Resource
  OrderService orderService;

  @Override
  public PackService service() {
    return service;
  }

}
