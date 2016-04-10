package com.aomi.restaurant.controller.admin;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aomi.restaurant.pojo.Dish;
import com.aomi.restaurant.service.DishService;
import com.aomi.restaurant.vo.DishPageParam;

@Controller
@RequestMapping("/admin/data/dish")
public class DishAdminCtrl extends CRUDAdminCtrl<Dish, DishPageParam> {

  @Resource
  DishService service;

  @Override
  public DishService service() {
    return service;
  }
}
