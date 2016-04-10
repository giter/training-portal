package com.aomi.restaurant.controller.admin;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.misc.Utils;
import com.aomi.busorder.vo.RESTResponse;
import com.aomi.restaurant.pojo.Notice;
import com.aomi.restaurant.service.NoticeService;
import com.aomi.restaurant.vo.NoticePageParam;

@Controller
@RequestMapping("/admin/data/notice")
public class NoticeAdminCtrl extends CRUDAdminCtrl<Notice, NoticePageParam> {

  @Resource
  NoticeService service;

  @Override
  public NoticeService service() {
    return service;
  }

  @Override
  @ResponseBody
  @RequestMapping(value = "/insert.json", method = RequestMethod.POST)
  public String insert(HttpServletRequest request, HttpSession session)
      throws IOException {

    Notice t = Utils.parseJSON(request.getInputStream(), service().clazz());
    t.put("user", session.getAttribute("admin"));

    return RESTResponse.of(service().insert(t)).toString();
  }
}
