package com.aomi.goods.controller.admin;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aomi.goods.pojo.Goods;
import com.aomi.goods.service.GoodsService;
import com.aomi.goods.vo.GoodsPageParam;
import com.aomi.restaurant.controller.admin.CRUDAdminCtrl;
import com.aomi.restaurant.service.CRUDService;

@Controller
@RequestMapping("/admin/data/goods")
public class GoodsAdminCtrl extends CRUDAdminCtrl<Goods, GoodsPageParam> {

  @Resource
  GoodsService service;

  @Override
  public CRUDService<Goods, GoodsPageParam> service() {
    return service;
  }

}
