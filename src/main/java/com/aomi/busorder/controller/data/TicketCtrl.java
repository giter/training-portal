package com.aomi.busorder.controller.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aomi.busorder.constant.Errors;
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

    List<Map<String, Object>> r = new ArrayList<>();

    for (Bus bus : busService.page(param)) {

      Map<String, Object> mm = new HashMap<>();

      int all = 0;
      int available = 0;

      SeatParam sparam = new SeatParam();
      sparam.setBus(bus.get_id());
      sparam.setLimit(0);

      for (Seat seat : seatService.page(sparam)) {

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

      r.add(mm);
    }

    return RESTResponse.of(r).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/tickets.json", method = { RequestMethod.GET })
  public String tickets(@RequestParam("bus") String id,
      @RequestParam("date") String date) {

    Bus bus = busService.get(id);

    if (bus == null)
      return RESTResponse.of(null).toString();

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

      seats.add(seat);
    }

    return RESTResponse.of(bus).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/ticket/{id}.json", method = { RequestMethod.PUT })
  public String take(@PathVariable("id") String id, HttpSession session) {

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定...").toString();
    }

    return RESTResponse.of(ticketService.take(id, user)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/ticket/{id}.json", method = { RequestMethod.DELETE })
  public String back(@PathVariable("id") String id, HttpSession session) {

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定...").toString();
    }

    return RESTResponse.of(ticketService.take(id, user)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/ticket/mine.json", method = { RequestMethod.GET })
  public String back(HttpSession session) {

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定...").toString();
    }

    TicketParam param = new TicketParam();

    param.setLimit(0);
    param.setUid(user.get_id());

    return RESTResponse.of(ticketService.page(param)).toString();
  }
}
