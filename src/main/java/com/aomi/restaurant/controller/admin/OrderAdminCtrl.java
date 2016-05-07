package com.aomi.restaurant.controller.admin;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.vo.RESTResponse;
import com.aomi.restaurant.pojo.Order;
import com.aomi.restaurant.service.OrderService;
import com.aomi.restaurant.service.PackService;
import com.aomi.restaurant.vo.OrderPageParam;

@Controller
@RequestMapping("/admin/data/order")
public class OrderAdminCtrl extends CRUDAdminCtrl<Order, OrderPageParam> {

  @Resource
  OrderService service;

  @Resource
  PackService packService;

  @Override
  public OrderService service() {
    return service;
  }

  @ResponseBody
  @RequestMapping(value = "/{id}/as-pack.json", method = { RequestMethod.POST })
  public String $id_as_pack(@PathVariable("id") String id,
      HttpServletRequest request) {

    Order order = service.get(id);

    if (order == null) {
      return RESTResponse.of(201, "无此订单").toString();
    }

    if (order.getMenu() == null || order.getMenu().size() == 0) {
      return RESTResponse.of(202, "空订单").toString();
    }

    order.set_id(new ObjectId().toHexString());

    packService.collection().save(order);

    return RESTResponse.of(order).toString();
  }
}
