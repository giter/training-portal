package com.aomi.goods.controller.admin;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aomi.goods.pojo.Basket;
import com.aomi.goods.service.BasketService;
import com.aomi.goods.vo.BasketPageParam;
import com.aomi.restaurant.controller.admin.CRUDAdminCtrl;
import com.aomi.restaurant.service.CRUDService;

@Controller
@RequestMapping("/admin/data/basket")
public class BasketAdminCtrl extends CRUDAdminCtrl<Basket, BasketPageParam> {

  @Resource
  BasketService service;

  @Override
  public CRUDService<Basket, BasketPageParam> service() {
    return service;
  }

}
