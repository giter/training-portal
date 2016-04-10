package com.aomi.restaurant.controller.admin;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aomi.restaurant.pojo.Table;
import com.aomi.restaurant.service.TableService;
import com.aomi.restaurant.vo.TablePageParam;

@Controller
@RequestMapping("/admin/data/table")
public class TableAdminCtrl extends CRUDAdminCtrl<Table, TablePageParam> {

  @Resource
  TableService service;

  @Override
  public TableService service() {
    return service;
  }
}
