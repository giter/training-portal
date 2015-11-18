package com.aomi.busorder.controller.data;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.math.NumberUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aomi.busorder.form.OrderForm;
import com.aomi.busorder.misc.Errors;
import com.aomi.busorder.misc.Utils;
import com.aomi.busorder.param.BusParam;
import com.aomi.busorder.param.SeatParam;
import com.aomi.busorder.param.TicketParam;
import com.aomi.busorder.pojo.Bus;
import com.aomi.busorder.pojo.Seat;
import com.aomi.busorder.pojo.Ticket;
import com.aomi.busorder.pojo.User;
import com.aomi.busorder.service.BusService;
import com.aomi.busorder.service.SeatService;
import com.aomi.busorder.service.TicketService;
import com.aomi.busorder.service.UserService;
import com.aomi.busorder.vo.RESTResponse;
import com.aomi.busorder.vo.VTUser;

@RestController
public class TicketCtrl {

  @Resource
  BusService busService;

  @Resource
  UserService userService;

  @Resource
  SeatService seatService;

  @Resource
  TicketService ticketService;

  @ResponseBody
  @RequestMapping(value = "/data/tickets/stats.json", method = { RequestMethod.GET })
  public String stats(@RequestParam("dest") String dest,
      @RequestParam("date") String date) {

    BusParam param = new BusParam();

    param.setLimit(0);
    param.setOnline(1);
    param.setDestination(dest);

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    try {
      Date dt = sdf.parse(date);

      @SuppressWarnings("deprecation")
      int weekday = dt.getDay();

      if (weekday == 0) {
        weekday = 7;
      }

      weekday = weekday - 1;

      param.setWeek(weekday);

    } catch (ParseException e) {
      throw new RuntimeException(e);
    }

    List<Map<String, Object>> r = new ArrayList<>();

    for (Bus bus : busService.page(param)) {

      Map<String, Object> mm = new HashMap<>();

      int all = 0;
      int available = 0;

      SeatParam sparam = new SeatParam();
      sparam.setBus(bus.get_id());
      sparam.setLimit(0);

      for (Seat seat : seatService.page(sparam)) {

        if (!NumberUtils.isNumber(seat.getSn()))
          continue;

        Ticket ticket = ticketService.getByDate(date, seat.get_id());

        if (ticket == null)
          continue;

        all++;

        if (ticket.getUser() == null)
          available++;
      }

      mm.put("id", bus.get_id());
      mm.put("name", bus.getName());
      mm.put("whither", bus.getDestination());
      mm.put("date", String.format("%s %s", date, bus.getGoff()));
      mm.put("void", available);
      mm.put("order", all - available);
      mm.put("src", bus.getSrc());
      mm.put("sn", bus.getSn());
      mm.put("line", bus.getLine());
      mm.put("arrive", bus.getArrive());

      r.add(mm);
    }

    Collections.sort(r, new Comparator<Map<String, Object>>() {

      @Override
      public int compare(Map<String, Object> o1, Map<String, Object> o2) {

        int c1 = o1.get("date").toString().compareTo(o2.get("date").toString());

        if (c1 != 0)
          return c1;

        int c2 = o1.get("arrive").toString()
            .compareTo(o2.get("arrive").toString());
        if (c2 != 0)
          return c2;

        int c3 = o1.get("line").toString().compareTo(o2.get("line").toString());
        if (c3 != 0)
          return c3;

        return o1.get("name").toString().compareTo(o2.get("name").toString());
      }
    });

    return RESTResponse.of(r).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/tickets.json", method = { RequestMethod.PUT })
  public String tickets(HttpSession session, HttpServletRequest request)
      throws IOException {

    List<OrderForm> tus = Utils.parseJSONArray(request.getInputStream(),
        OrderForm.class);

    String openID = (String) session.getAttribute("openID");

    User source = userService.getByOpenID(openID);

    if (openID == null || source == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定或未登录...").toString();
    }

    List<Pair<String, User>> tickets = new ArrayList<>();

    for (OrderForm p : tus) {

      User user = userService.get(p.uid);
      if (user == null) {

        return RESTResponse.of(Errors.NO_SUCH_ITEM, "被委托人不存在...").toString();
      }

      if (!source.getDelegation().contains(source.get_id())) {

        if (!(source.getRelated() != null && source.getRelated().equals(
            source.get_id()))) {
          return RESTResponse.of(Errors.UNAUTHORIZED, "委托或亲属关系不存在...")
              .toString();
        }
      }
    }

    List<Ticket> takes = ticketService.takes(source, tickets);

    if (takes.size() == 0) {

      return RESTResponse.of(Errors.ITEM_BEEN_ORDERED, "部分车票已被预订...")
          .toString();
    }

    return RESTResponse.of(tus).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/tickets.json", method = { RequestMethod.GET })
  public String tickets(@RequestParam("bus") String id,
      @RequestParam("date") String date) {

    Bus bus = busService.get(id);

    if (bus == null)
      return RESTResponse.of(null).toString();

    bus.setSrc(null);
    bus.put("seats", new ArrayList<Seat>());

    SeatParam sparam = new SeatParam();
    sparam.setBus(id);
    sparam.setLimit(0);

    @SuppressWarnings("unchecked")
    ArrayList<Seat> seats = (ArrayList<Seat>) bus.get("seats");

    for (Seat seat : seatService.page(sparam)) {

      Ticket ticket = ticketService.getByDate(date, seat.get_id());

      if (ticket == null)
        continue;

      if (ticket.getUser() != null) {
        seat.put("state", 2);
      } else {
        seat.put("state", 1);
      }

      seat.put("ticket", ticket.get_id());

      seat.put("entity", new VTUser(ticket));

      seats.add(seat);
    }

    return RESTResponse.of(bus).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/ticket/{id}.json", method = { RequestMethod.PUT })
  public String order(@PathVariable("id") String id, HttpSession session) {

    Ticket ticket = ticketService.get(id);

    if (ticket == null) {
      return RESTResponse.of(Errors.NO_SUCH_ITEM, "查无此票...").toString();
    }

    if (ticket.getUser() != null) {
      return RESTResponse.of(Errors.ITEM_BEEN_ORDERED, "车票已被预订...").toString();
    }

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定或未登录...").toString();
    }

    if (ticketService.countByDate(user.get_id(), ticket.getDate()) >= user
        .getLimit()) {
      return RESTResponse.of(Errors.LIMIT_EXCEED, "超过本日订票限制...").toString();
    }

    return RESTResponse.of(ticketService.take(id, user)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/ticket/{uid}/{id}.json", method = { RequestMethod.PUT })
  public String delegateOrder(@PathVariable("uid") String uid,
      @PathVariable("id") String id, HttpSession session) {

    Ticket ticket = ticketService.get(id);

    if (ticket == null) {
      return RESTResponse.of(Errors.NO_SUCH_ITEM, "查无此票...").toString();
    }

    if (ticket.getUser() != null) {
      return RESTResponse.of(Errors.ITEM_BEEN_ORDERED, "车票已被预订...").toString();
    }

    String openID = (String) session.getAttribute("openID");

    User source = userService.getByOpenID(openID);

    if (openID == null || source == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定或未登录...").toString();
    }

    User user = userService.get(uid);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.NO_SUCH_ITEM, "被委托人不存在...").toString();
    }

    if (!user.getDelegation().contains(source.get_id())) {

      if (!(user.getRelated() != null && user.getRelated().equals(
          source.get_id()))) {
        return RESTResponse.of(Errors.UNAUTHORIZED, "委托或亲属关系不存在...").toString();
      }
    }

    if (ticketService.countByDate(user.get_id(), ticket.getDate()) >= user
        .getLimit()) {
      return RESTResponse.of(Errors.LIMIT_EXCEED, "超过本日订票限制...").toString();
    }

    return RESTResponse.of(ticketService.take(id, user, source)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/ticket/{id}.json", method = { RequestMethod.DELETE })
  public String refund(@PathVariable("id") String id, HttpSession session) {

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定或未登录...").toString();
    }

    return RESTResponse.of(ticketService.refund(id, user)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/ticket/mine.json", method = { RequestMethod.GET })
  public String mine(HttpSession session, @ModelAttribute TicketParam param) {

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定或未登录...").toString();
    }

    param.setBy(user.get_id());

    return RESTResponse.of(ticketService.page(param)).toString();
  }
}
