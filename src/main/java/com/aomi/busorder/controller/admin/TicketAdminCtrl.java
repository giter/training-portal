package com.aomi.busorder.controller.admin;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.misc.Errors;
import com.aomi.busorder.param.TicketParam;
import com.aomi.busorder.pojo.Ticket;
import com.aomi.busorder.pojo.User;
import com.aomi.busorder.service.TicketService;
import com.aomi.busorder.service.UserService;
import com.aomi.busorder.vo.RESTResponse;

@Controller
public class TicketAdminCtrl {

  @Resource
  TicketService ticketService;

  @Resource
  UserService userService;

  @ResponseBody
  @RequestMapping(value = "/admin/data/ticket/generate/{date}.json", method = { RequestMethod.GET })
  public String generate(@PathVariable("date") String date) {

    int n = ticketService.generateAll(date);
    return "+OK.\r\n\r\n We generated with " + n + " for " + date + ".";
  }

  @ResponseBody
  @RequestMapping(value = { "/data/admin/tickets.json",
      "/admin/data/tickets.json" }, method = { RequestMethod.GET })
  public String tickets(@ModelAttribute TicketParam param) {

    return RESTResponse.of(ticketService.page(param)).get();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/ticket/{uid}/{id}.json", method = { RequestMethod.PUT })
  public String order(@PathVariable("uid") String uid,
      @PathVariable("id") String id) {

    Ticket ticket = ticketService.get(id);

    if (ticket == null) {
      return RESTResponse.of(Errors.NO_SUCH_ITEM, "查无此票...").toString();
    }

    if (ticket.getUser() != null) {
      return RESTResponse.of(Errors.ITEM_BEEN_ORDERED, "车票已被预订...").toString();
    }

    User user = userService.get(uid);

    if (user == null) {

      return RESTResponse.of(Errors.NO_SUCH_ITEM, "无此用户...").toString();
    }

    if (ticketService.exceedLimit(user, ticket)) {
      return RESTResponse.of(Errors.LIMIT_EXCEED, "超过本日订票限制...").toString();
    }

    return RESTResponse.of(ticketService.take(id, user)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/ticket/{uid}/{id}.json", method = { RequestMethod.DELETE })
  public String refund(@PathVariable("uid") String uid,
      @PathVariable("id") String id) {

    Ticket ticket = ticketService.get(id);

    if (ticket == null) {
      return RESTResponse.of(Errors.NO_SUCH_ITEM, "查无此票...").toString();
    }

    if (ticket.getUser() == null) {

      return RESTResponse.of(Errors.NO_SUCH_ITEM, "车票尚未预订...").toString();
    }

    User user = userService.get(uid);

    if (user == null) {

      return RESTResponse.of(Errors.NO_SUCH_ITEM, "无此用户...").toString();
    }

    if (!uid.equals(ticket.getUser().get_id())) {
      return RESTResponse.of(Errors.UNAUTHORIZED, "车票所属错误...").toString();
    }

    return RESTResponse.of(ticketService.refund(id, user)).toString();
  }
}
