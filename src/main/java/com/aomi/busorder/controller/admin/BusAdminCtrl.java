package com.aomi.busorder.controller.admin;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aomi.busorder.misc.Utils;
import com.aomi.busorder.param.BusParam;
import com.aomi.busorder.pojo.Bus;
import com.aomi.busorder.pojo.Seat;
import com.aomi.busorder.service.BusService;
import com.aomi.busorder.service.SeatService;
import com.aomi.busorder.vo.Page;
import com.aomi.busorder.vo.RESTResponse;
import com.mongodb.BasicDBObjectBuilder;

@RestController
public class BusAdminCtrl {

  @Resource
  BusService service;

  @Resource
  SeatService seatservice;

  @ResponseBody
  @RequestMapping(value = "/admin/data/bus/{id}.json", method = { RequestMethod.GET })
  public String get(@PathVariable("id") String id) {

    return RESTResponse.of(service.get(id)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/bus.json", method = { RequestMethod.POST })
  public String insert(HttpServletRequest request) throws IOException {

    Bus bus = Utils.parseJSON(request.getInputStream(), Bus.class);
    bus.append("rows", 12);
    bus.append("cols", 5);
    Bus bus1 = service.insert(bus);
    Seat seat = new Seat();
    seat.setBus(bus1.get_id());
    seat.append("row", 0);
    seat.append("col", 0);
    seat.setSn("4");
    seatservice.insert(seat);

    seat.append("row", 0);
    seat.append("col", 1);
    seat.setSn("3");
    seatservice.insert(seat);

    seat.append("row", 0);
    seat.append("col", 3);
    seat.setSn("2");
    seatservice.insert(seat);

    seat.append("row", 0);
    seat.append("col", 4);
    seat.setSn("1");
    seatservice.insert(seat);

    seat.append("row", 1);
    seat.append("col", 0);
    seat.setSn("8");
    seatservice.insert(seat);

    seat.append("row", 1);
    seat.append("col", 1);
    seat.setSn("7");
    seatservice.insert(seat);

    seat.append("row", 1);
    seat.append("col", 3);
    seat.setSn("6");
    seatservice.insert(seat);

    seat.append("row", 1);
    seat.append("col", 4);
    seat.setSn("5");
    seatservice.insert(seat);

    seat.append("row", 2);
    seat.append("col", 0);
    seat.setSn("12");
    seatservice.insert(seat);

    seat.append("row", 2);
    seat.append("col", 1);
    seat.setSn("11");
    seatservice.insert(seat);

    seat.append("row", 2);
    seat.append("col", 3);
    seat.setSn("10");
    seatservice.insert(seat);

    seat.append("row", 2);
    seat.append("col", 4);
    seat.setSn("9");
    seatservice.insert(seat);

    seat.append("row", 3);
    seat.append("col", 0);
    seat.setSn("16");
    seatservice.insert(seat);

    seat.append("row", 3);
    seat.append("col", 1);
    seat.setSn("15");
    seatservice.insert(seat);

    seat.append("row", 3);
    seat.append("col", 3);
    seat.setSn("14");
    seatservice.insert(seat);

    seat.append("row", 3);
    seat.append("col", 4);
    seat.setSn("13");
    seatservice.insert(seat);

    seat.append("row", 4);
    seat.append("col", 0);
    seat.setSn("20");
    seatservice.insert(seat);

    seat.append("row", 4);
    seat.append("col", 1);
    seat.setSn("19");
    seatservice.insert(seat);

    seat.append("row", 4);
    seat.append("col", 3);
    seat.setSn("18");
    seatservice.insert(seat);

    seat.append("row", 4);
    seat.append("col", 4);
    seat.setSn("17");
    seatservice.insert(seat);

    seat.append("row", 5);
    seat.append("col", 0);
    seat.setSn("22");
    seatservice.insert(seat);

    seat.append("row", 5);
    seat.append("col", 1);
    seat.setSn("21");
    seatservice.insert(seat);

    seat.append("row", 5);
    seat.append("col", 4);
    seat.setSn("中");
    seatservice.insert(seat);

    seat.append("row", 6);
    seat.append("col", 0);
    seat.setSn("24");
    seatservice.insert(seat);

    seat.append("row", 6);
    seat.append("col", 1);
    seat.setSn("23");
    seatservice.insert(seat);

    seat.append("row", 6);
    seat.append("col", 4);
    seat.setSn("门");
    seatservice.insert(seat);

    seat.append("row", 7);
    seat.append("col", 0);
    seat.setSn("28");
    seatservice.insert(seat);

    seat.append("row", 7);
    seat.append("col", 1);
    seat.setSn("27");
    seatservice.insert(seat);

    seat.append("row", 7);
    seat.append("col", 3);
    seat.setSn("26");
    seatservice.insert(seat);

    seat.append("row", 7);
    seat.append("col", 4);
    seat.setSn("25");
    seatservice.insert(seat);

    seat.append("row", 8);
    seat.append("col", 0);
    seat.setSn("32");
    seatservice.insert(seat);

    seat.append("row", 8);
    seat.append("col", 1);
    seat.setSn("31");
    seatservice.insert(seat);

    seat.append("row", 8);
    seat.append("col", 3);
    seat.setSn("30");
    seatservice.insert(seat);

    seat.append("row", 8);
    seat.append("col", 4);
    seat.setSn("29");
    seatservice.insert(seat);

    seat.append("row", 9);
    seat.append("col", 0);
    seat.setSn("36");
    seatservice.insert(seat);

    seat.append("row", 9);
    seat.append("col", 1);
    seat.setSn("35");
    seatservice.insert(seat);

    seat.append("row", 9);
    seat.append("col", 3);
    seat.setSn("34");
    seatservice.insert(seat);

    seat.append("row", 9);
    seat.append("col", 4);
    seat.setSn("33");
    seatservice.insert(seat);

    seat.append("row", 10);
    seat.append("col", 0);
    seat.setSn("40");
    seatservice.insert(seat);

    seat.append("row", 10);
    seat.append("col", 1);
    seat.setSn("39");
    seatservice.insert(seat);

    seat.append("row", 10);
    seat.append("col", 3);
    seat.setSn("38");
    seatservice.insert(seat);

    seat.append("row", 10);
    seat.append("col", 4);
    seat.setSn("37");
    seatservice.insert(seat);

    seat.append("row", 11);
    seat.append("col", 0);
    seat.setSn("45");
    seatservice.insert(seat);

    seat.append("row", 11);
    seat.append("col", 1);
    seat.setSn("44");
    seatservice.insert(seat);

    seat.append("row", 11);
    seat.append("col", 2);
    seat.setSn("43");
    seatservice.insert(seat);

    seat.append("row", 11);
    seat.append("col", 3);
    seat.setSn("42");
    seatservice.insert(seat);

    seat.append("row", 11);
    seat.append("col", 4);
    seat.setSn("41");
    seatservice.insert(seat);

    return RESTResponse.of(bus1).toString();

  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/bus/{id}.json", method = { RequestMethod.PUT })
  public String save(@PathVariable("id") String id, HttpServletRequest request)
      throws IOException {

    Bus bus = Utils.parseJSON(request.getInputStream(), Bus.class);
    bus.set_id(id);

    return RESTResponse.of(service.save(bus)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/bus/{id}.json", method = { RequestMethod.DELETE })
  public String remove(@PathVariable("id") String id) {

    return RESTResponse.of(service.remove(id)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/buses.json", method = {
      RequestMethod.GET, RequestMethod.POST })
  public String pages(@ModelAttribute BusParam busParam) {

    busParam.setSort(BasicDBObjectBuilder.start().add(Bus.FIELD_DESTINATION, 1)
        .add(Bus.FIELD_NAME, 1).add(Bus.FIELD_ARRIVE, 1).get());

    return RESTResponse.of(
        Page.of(service.count(busParam), service.page(busParam))).toString();
  }
}
