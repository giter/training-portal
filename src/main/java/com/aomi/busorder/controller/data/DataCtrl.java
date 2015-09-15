package com.aomi.busorder.controller.data;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aomi.busorder.param.UserParam;
import com.aomi.busorder.pojo.User;
import com.aomi.busorder.service.UserService;
import com.aomi.busorder.vo.Page;
import com.aomi.busorder.vo.RESTResponse;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBObject;

@RestController
public class DataCtrl {

  @Resource
  UserService userService;

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
  public String users(@RequestParam(required = false) UserParam userParam,
      @RequestParam(required = false, defaultValue = "0") int page,
      @RequestParam(required = false, defaultValue = "100") int limit) {

    return RESTResponse.of(
        Page.of(userService.count(userParam),
            userService.page(userParam, page, limit))).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/companies.json", method = { RequestMethod.GET })
  public String companies() {

    UserParam param = new UserParam();
    param.hasCompany = true;

    Set<String> companies = new TreeSet<String>();

    for (DBObject r : userService.page(param, 0, 100000)) {

      User u = (User) r;
      companies.add(u.getCompany());
    }

    return RESTResponse.of(companies).toString();
  }

  /**
   * @ResponseBody
   * @RequestMapping(value = "/data/whither.json", method = { RequestMethod.GET
   *                       }) public String whither() {
   * 
   *                       }
   */
}
