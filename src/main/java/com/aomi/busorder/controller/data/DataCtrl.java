package com.aomi.busorder.controller.data;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aomi.busorder.param.BusParam;
import com.aomi.busorder.param.UserParam;
import com.aomi.busorder.pojo.Bus;
import com.aomi.busorder.pojo.User;
import com.aomi.busorder.service.BusService;
import com.aomi.busorder.service.UserService;
import com.aomi.busorder.vo.Page;
import com.aomi.busorder.vo.RESTResponse;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBObject;

@RestController
public class DataCtrl {

  @Resource
  UserService userService;

  @Resource
  BusService busService;

  @ResponseBody
  @RequestMapping(value = "/data/calendar.json", method = { RequestMethod.GET })
  public String calendar() {

    SimpleDateFormat sdf = new SimpleDateFormat("MM月dd日");

    List<DBObject> rs = new ArrayList<>();

    for (int i = 0; i < 7; i++) {

      Calendar instance = Calendar.getInstance();
      instance.add(Calendar.DATE, i);

      BasicDBObjectBuilder o = BasicDBObjectBuilder.start();

      o.add("name", sdf.format(instance.getTime()));
      o.add(
          "week",
          "周"
              + Character.toString("日一二三四五六".charAt(instance
                  .get(Calendar.DAY_OF_WEEK) - 1)));
      o.add("other", "");

      rs.add(o.get());
    }

    return RESTResponse.of(rs).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/users.json", method = { RequestMethod.GET })
  public String users(@ModelAttribute UserParam userParam) {

    return RESTResponse.of(
        Page.of(userService.count(userParam), userService.page(userParam)))
        .toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/companies.json", method = { RequestMethod.GET })
  public String companies(@ModelAttribute UserParam param) {

    param.setHasCompany(true);

    Set<String> companies = new TreeSet<String>();

    for (DBObject r : userService.page(param)) {

      User u = (User) r;
      companies.add(u.getCompany());
    }

    return RESTResponse.of(companies).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/whither.json", method = { RequestMethod.GET })
  public String whither() {

    BusParam param = new BusParam();
    param.setLimit(0);
    param.setOnline(1);

    Map<String, List<Map<String, String>>> destinations = new HashMap<>();

    Set<String> dests = new TreeSet<>();

    for (Bus bus : busService.page(param)) {

      if (bus.getCaptial() == null)
        continue;

      if (dests.contains(bus.getDestination()))
        continue;

      dests.add(bus.getDestination());

      if (destinations.get(bus.getCaptial()) == null)
        destinations
            .put(bus.getCaptial(), new ArrayList<Map<String, String>>());

      List<Map<String, String>> l = destinations.get(bus.getCaptial());

      Map<String, String> v = new HashMap<>();

      v.put("id", bus.getDestination());
      v.put("name", bus.getDestination());
      v.put("tag", bus.getPinyin());

      l.add(v);

    }

    return RESTResponse.of(destinations.entrySet()).toString();
  }
}
