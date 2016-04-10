package com.aomi.restaurant.controller.data;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.vo.RESTResponse;
import com.aomi.restaurant.service.NoticeService;
import com.aomi.restaurant.vo.NoticePageParam;
import com.mongodb.BasicDBObjectBuilder;

@Controller
public class NoticeCtrl {

  @Resource
  NoticeService service;

  @ResponseBody
  @RequestMapping(value = "/data/notices.json", method = { RequestMethod.GET })
  public String get() {

    NoticePageParam param = new NoticePageParam();

    param.setLimit(-1);
    param.setCounting(false);
    param.setVisible(true);
    param.setSort(BasicDBObjectBuilder.start().add("top", -1)
        .add("created", -1).get());

    return RESTResponse.of(service.page(param)).toString();
  }
}
