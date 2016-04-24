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

import com.aomi.busorder.misc.Errors;
import com.aomi.busorder.misc.Utils;
import com.aomi.busorder.pojo.User;
import com.aomi.busorder.service.UserService;
import com.aomi.busorder.vo.RESTResponse;
import com.aomi.restaurant.form.ListDishForm;
import com.aomi.restaurant.form.ListDishForm.DishForm;
import com.aomi.restaurant.form.OrderForm;
import com.aomi.restaurant.form.OrderForm.DishList;
import com.aomi.restaurant.pojo.Dish;
import com.aomi.restaurant.pojo.Order;
import com.aomi.restaurant.pojo.Table;
import com.aomi.restaurant.service.DishService;
import com.aomi.restaurant.service.OrderService;
import com.aomi.restaurant.service.TableService;
import com.aomi.restaurant.vo.OrderPageParam;
import com.aomi.restaurant.vo.TablePageParam;
import com.aomi.restaurant.vo.VOUser;

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

  @ResponseBody
  @RequestMapping(value = "/data/table/{id}.json", method = { RequestMethod.PUT })
  public String data_table_$id(@PathVariable("id") String id,
      HttpServletRequest request, HttpSession session) throws Exception {

    User user = userService.getFromSession(session);

    if (user == null) {
      return RESTResponse.of(Errors.UNAUTHORIZED, null).get();
    }

    Table table = tableService.get(id);

    if (table == null) {
      return RESTResponse.of(Errors.NO_SUCH_ITEM, null).get();
    }

    OrderForm form = Utils.parseJSON(request.getInputStream(), OrderForm.class);

    Order order = new Order();

    if (form.mdate != null) {
      order.put("mdate", form.mdate);
    }

    if (form.mtime != null) {
      order.put("mtime", form.mtime);
    }

    if (form.number != null) {
      order.put("number", form.number);
    }

    if (form.remark != null) {
      order.put("remark", form.remark);
    }

    if (form.exact != null) {
      order.put("exact", form.exact);
    }

    order.put("table", table);

    if (order == null || order.getMdate() == null || order.getMtime() == null
        || order.getTable() == null) {
      return RESTResponse.of(Errors.PARAMETER_ERROR, null).get();
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

    ArrayList<Object> menu = new ArrayList<>();

    order.put("menu", menu);

    if (form.menu != null) {

      for (DishList s : form.menu) {

        Dish dish = dishService.get(s._id);

        if (dish != null && s.number > 0) {

          dish.put("number", s.number);
          menu.add(dish);
        }
      }
    }

    order.put("user", user);

    orderService.insert(order);

    return RESTResponse.of(order).get();
  }

  @ResponseBody
  @RequestMapping(value = "/data/order/{id}.json", method = { RequestMethod.POST })
  public String data_order_$id(@PathVariable("id") String id,
      HttpServletRequest request, HttpSession session) throws Exception {

    User user = userService.getFromSession(session);

    if (user == null) {
      return RESTResponse.of(Errors.UNAUTHORIZED, null).get();
    }

    OrderForm form = Utils.parseJSON(request.getInputStream(), OrderForm.class);

    Order order = orderService.get(id);

    if (!(order.getUser().get_id().equals(user.get_id()))) {
      return RESTResponse.of(Errors.UNAUTHORIZED, null).get();
    }

    if (form.mdate != null) {
      order.put("mdate", form.mdate);
    }

    if (form.mtime != null) {
      order.put("mtime", form.mtime);
    }

    if (form.number != null) {
      order.put("number", form.number);
    }

    if (form.remark != null) {
      order.put("remark", form.remark);
    }

    if (form.exact != null) {
      order.put("exact", form.exact);
    }

    if (form.menu != null) {

      ArrayList<Object> menu = new ArrayList<>();
      order.put("menu", menu);

      for (DishList s : form.menu) {

        Dish dish = dishService.get(s._id);

        if (dish != null && s.number > 0) {

          dish.put("number", s.number);
          menu.add(dish);
        }
      }
    }

    orderService.update(order);

    return RESTResponse.of(order).get();
  }

  @ResponseBody
  @RequestMapping(value = "/data/order/{id}.json", method = { RequestMethod.DELETE })
  public String data_order_$id(@PathVariable("id") String _id) {

    orderService.unorder(_id);
    return RESTResponse.of(null).get();
  }

  @ResponseBody
  @RequestMapping(value = "/data/order/{id}.json", method = { RequestMethod.GET })
  public String data_order_$id(HttpSession session, HttpServletRequest request,
      @PathVariable("id") String id) throws Exception {

    User user = userService.getFromSession(session);
    Order order = orderService.get(id);

    if (user == null || order == null || order.getUser() == null) {
      return RESTResponse.of(Errors.UNAUTHORIZED, null).get();
    }

    if (!order.getUser().get_id().equals(user.get_id())) {
      return RESTResponse.of(Errors.NO_SUCH_ITEM, null).get();
    }

    order.put("user", new VOUser(order.getUser()));

    return RESTResponse.of(order).get();
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

      if (o.get("user") != null) {
        o.put("user", new VOUser((User) o.get("user")));
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
