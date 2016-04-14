package com.aomi.restaurant.controller.data;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.misc.Utils;
import com.aomi.busorder.pojo.User;
import com.aomi.busorder.service.UserService;
import com.aomi.busorder.vo.RESTResponse;
import com.aomi.restaurant.form.ListDishForm;
import com.aomi.restaurant.form.ListDishForm.DishForm;
import com.aomi.restaurant.form.OrderForm;
import com.aomi.restaurant.pojo.Dish;
import com.aomi.restaurant.pojo.Order;
import com.aomi.restaurant.pojo.Table;
import com.aomi.restaurant.service.DishService;
import com.aomi.restaurant.service.OrderService;
import com.aomi.restaurant.service.TableService;
import com.aomi.restaurant.vo.OrderPageParam;
import com.aomi.restaurant.vo.TablePageParam;

@Controller
public class OrderCtrl {

  @Resource
  UserService userService;

  @Resource
  OrderService orderService;

  @Resource
  DishService dishService;

  @Resource
  TableService tableService;

  @RequestMapping(value = "/data/table/{id}.json", method = { RequestMethod.PUT })
  public String data_table_$id(@PathVariable("id") String id,
      HttpServletRequest request, HttpSession session) throws Exception {

    User user = userService.getFromSession(session);

    Table table = tableService.get(id);

    if (table == null) {
      return RESTResponse.of(null).get();
    }

    OrderForm form = Utils.parseJSON(request.getInputStream(), OrderForm.class);

    Order order = new Order();

    order.put("mdate", form.mdate);
    order.put("mtime", form.mtime);
    order.put("number", form.number);

    order.put("table", table);

    ArrayList<Object> menu = new ArrayList<>();

    order.put("menu", menu);

    if (form.menu != null) {
      for (String s : form.menu) {
        menu.add(dishService.get(s));
      }
    }

    if (order == null || order.getMdate() == null || order.getMtime() == null
        || order.getTable() == null) {
      return RESTResponse.of(null).get();
    }

    OrderPageParam opp = new OrderPageParam();

    opp.setLimit(1);
    opp.setCounting(false);
    opp.setMdate(order.getMdate());
    opp.setMtime(order.getMtime());
    opp.setTid(order.getTable().get_id());

    opp.setState(1);

    if (orderService.page(opp).size() > 0) {
      return RESTResponse.of(null).get();
    }

    order.put("user", user);

    orderService.insert(order);

    return RESTResponse.of(order).get();
  }

  @ResponseBody
  @RequestMapping(value = "/data/order/{id}.json", method = { RequestMethod.DELETE })
  public String data_order_$id(@PathVariable("id") String _id) {

    orderService.unorder(_id);
    return RESTResponse.of(null).get();
  }

  @ResponseBody
  @RequestMapping(value = "/data/tables.json", method = { RequestMethod.GET })
  public String data_tables(
      @RequestParam(value = "mdate", required = true) String mdate,
      @RequestParam(value = "mtime", required = true) String mtime) {

    OrderPageParam opp = new OrderPageParam();

    opp.setLimit(-1);
    opp.setCounting(false);
    opp.setMdate(mdate);
    opp.setMtime(mtime);

    opp.setState(1);

    List<Order> orders = orderService.page(opp);

    TablePageParam tpp = new TablePageParam();
    tpp.setLimit(-1);
    tpp.setCounting(false);
    tpp.setVisible(1);

    List<Table> tables = tableService.page(tpp);
    Map<String, Table> tableMap = new LinkedHashMap<>();

    for (Table t : tables) {
      tableMap.put(t.get_id(), t);
    }

    for (Order o : orders) {

      if (o.getTable() != null) {

        tableMap.remove(o.getTable().get_id());
      }
    }

    for (Table t : tableMap.values()) {

      Order o = new Order();
      o.put("table", t);
      orders.add(o);
    }

    return RESTResponse.of(orders).get();
  }

  @ResponseBody
  @RequestMapping(value = "/data/order/{id}/dishes.json", method = { RequestMethod.PUT })
  public String data_order_$oid_dishes(@PathVariable("id") String id,
      HttpServletRequest request) throws Exception {

    ListDishForm form = Utils.parseJSON(request.getInputStream(),
        ListDishForm.class);

    List<Dish> dishes = new ArrayList<Dish>();

    if (form.dishes.size() > 0) {

      for (DishForm x : form.dishes) {

        Dish dish = dishService.get(x.id);
        if (dish != null) {
          dish.put("number", x.number);
          dishes.add(dish);
        }
      }
    }

    orderService.updateDishes(id, dishes);

    return RESTResponse.of(orderService.get(id)).get();
  }

  @ResponseBody
  @RequestMapping(value = "/data/order/{oid}/dish/{dish}/plus.json", method = { RequestMethod.PUT })
  public String data_order_$oid_dish_$dish_plus(
      @PathVariable("oid") String oid, @PathVariable("dish") String dish,
      HttpServletRequest request) throws Exception {

    dishService.plus(dish);

    return RESTResponse.of(1).get();
  }

  @ResponseBody
  @RequestMapping(value = "/data/order/mine.json", method = { RequestMethod.GET })
  public String data_order_mine(HttpSession session,
      HttpServletRequest request, @RequestParam("start") String start,
      @RequestParam("end") String end) throws Exception {

    User user = userService.getFromSession(session);

    OrderPageParam opp = new OrderPageParam();

    opp.setStart(start);
    opp.setEnd(end);
    opp.setUid(user.get_id());
    opp.setCounting(false);
    opp.setLimit(-1);

    return RESTResponse.of(orderService.page(opp)).get();
  }
}
