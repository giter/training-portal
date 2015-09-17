package com.aomi.busorder.controller.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aomi.busorder.param.BusParam;
import com.aomi.busorder.param.SeatParam;
import com.aomi.busorder.pojo.Bus;
import com.aomi.busorder.pojo.Seat;
import com.aomi.busorder.pojo.Ticket;
import com.aomi.busorder.service.BusService;
import com.aomi.busorder.service.SeatService;
import com.aomi.busorder.service.TicketService;
import com.aomi.busorder.vo.RESTResponse;

@RestController
public class TicketCtrl {

  @Resource
  BusService busService;

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
      mm.put("order", all);

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

    Map<String, Object> r = new LinkedHashMap<>();

    r.put("id", bus.get_id());
    r.put("name", bus.getName());
    r.put("destination", bus.getDestination());
    r.put("seats", new ArrayList<Seat>());

    SeatParam sparam = new SeatParam();
    sparam.setBus(id);
    sparam.setLimit(0);

    @SuppressWarnings("unchecked")
    ArrayList<Seat> seats = (ArrayList<Seat>) r.get("seats");

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

    return RESTResponse.of(r).toString();
  }
}
