package com.aomi.busorder.controller.admin;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aomi.busorder.misc.Utils;
import com.aomi.busorder.pojo.Seat;
import com.aomi.busorder.service.SeatService;
import com.aomi.busorder.vo.Page;
import com.aomi.busorder.vo.RESTResponse;

@RestController
public class SeatAdminCtrl {

  @Resource
  SeatService service;

  @ResponseBody
  @RequestMapping(value = "/admin/data/bus/{id}/seat/{sid}.json", method = { RequestMethod.GET })
  public String get(@PathVariable("id") String id,
      @PathVariable("sid") String sid) {

    return RESTResponse.of(service.get(sid)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/bus/{id}/seat.json", method = { RequestMethod.POST })
  public String insert(@PathVariable("id") String id, HttpServletRequest request)
      throws IOException {

    Seat seat = Utils.parseJSON(request.getInputStream(), Seat.class);
    seat.setBus(id);

    return RESTResponse.of(service.insert(seat)).toString();

  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/bus/{id}/seat/{sid}.json", method = { RequestMethod.PUT })
  public String save(@PathVariable("id") String id,
      @PathVariable("sid") String sid, HttpServletRequest request)
      throws IOException {

    Seat seat = Utils.parseJSON(request.getInputStream(), Seat.class);
    seat.setBus(id);
    seat.set_id(sid);

    return RESTResponse.of(service.save(seat)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/bus/{id}/seat/{sid}.json", method = { RequestMethod.DELETE })
  public String remove(@PathVariable("id") String id,
      @PathVariable("sid") String sid) {

    return RESTResponse.of(service.remove(sid)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/bus/{id}/seat.json", method = { RequestMethod.DELETE })
  public String removeAll(@PathVariable("id") String id) {

    service.removeAll(id);
    return RESTResponse.of(null).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/admin/data/bus/{id}/seats.json", method = {
      RequestMethod.GET, RequestMethod.POST })
  public String pages(
      @PathVariable("id") String id,
      @RequestParam(value = "page", required = false, defaultValue = "0") int page,
      @RequestParam(value = "limit", required = false, defaultValue = "100") int limit) {

    return RESTResponse.of(
        Page.of(service.count(id), service.page(id, page, limit))).toString();
  }

}
