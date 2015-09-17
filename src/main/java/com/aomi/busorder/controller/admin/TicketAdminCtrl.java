package com.aomi.busorder.controller.admin;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.service.TicketService;

@Controller
public class TicketAdminCtrl {

  @Resource
  TicketService ticketService;

  @ResponseBody
  @RequestMapping(value = "/admin/data/ticket/generate/{date}.json", method = { RequestMethod.GET })
  public String generate(@PathVariable("date") String date) {

    int n = ticketService.generateAll(date);
    return "+OK.\r\n\r\n We generated with " + n + " for " + date + ".";
  }
}
