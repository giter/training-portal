package com.aomi.restaurant.controller.admin;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aomi.restaurant.pojo.Order;
import com.aomi.restaurant.service.OrderService;
import com.aomi.restaurant.vo.OrderPageParam;

@Controller
@RequestMapping("/admin/data/order")
public class OrderAdminCtrl extends CRUDAdminCtrl<Order, OrderPageParam> {

  @Resource
  OrderService service;

  @Override
  public OrderService service() {
    return service;
  }
}
