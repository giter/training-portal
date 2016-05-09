package com.aomi.goods.controller.data;

import java.util.ArrayList;
import java.util.List;

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
import com.aomi.goods.form.BasketForm;
import com.aomi.goods.form.BasketForm.GoodsList;
import com.aomi.goods.form.ListGoodsForm;
import com.aomi.goods.form.ListGoodsForm.GoodsForm;
import com.aomi.goods.pojo.Basket;
import com.aomi.goods.pojo.Goods;
import com.aomi.goods.service.BasketService;
import com.aomi.goods.service.GoodsService;
import com.aomi.goods.vo.BasketPageParam;
import com.aomi.restaurant.vo.VOUser;

@Controller
public class BasketCtrl {

  @Resource
  BasketService service;

  @Resource
  GoodsService goodsService;

  @Resource
  UserService userService;

  @ResponseBody
  @RequestMapping(value = "/data/basket.json", method = { RequestMethod.PUT })
  public String data_basket(HttpServletRequest request, HttpSession session)
      throws Exception {

    User user = userService.getFromSession(session);

    if (user == null) {
      return RESTResponse.of(Errors.UNAUTHORIZED, null).get();
    }

    BasketForm form = Utils.parseJSON(request.getInputStream(),
        BasketForm.class);

    Basket order = new Basket();

    order.put("mdate", form.mdate);
    order.put("mtime", form.mtime);
    order.put("number", form.number);

    if (order == null || order.getMdate() == null) {
      return RESTResponse.of(Errors.PARAMETER_ERROR, null).get();
    }

    ArrayList<Object> items = new ArrayList<>();

    order.put("items", items);

    if (form.items != null) {

      for (GoodsList s : form.items) {

        Goods goods = goodsService.get(s._id);

        if (goods != null && s.number > 0) {

          goods.put("number", s.number);
          items.add(goods);
        }
      }
    }

    order.put("user", user);

    service.insert(order);

    return RESTResponse.of(order).get();
  }

  @ResponseBody
  @RequestMapping(value = "/data/basket/{id}.json", method = { RequestMethod.POST })
  public String data_basket_$id(@PathVariable("id") String id,
      HttpServletRequest request, HttpSession session) throws Exception {

    User user = userService.getFromSession(session);

    if (user == null) {
      return RESTResponse.of(Errors.UNAUTHORIZED, null).get();
    }

    BasketForm form = Utils.parseJSON(request.getInputStream(),
        BasketForm.class);

    Basket order = service.get(id);

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

    if (form.state != null) {
      order.put("state", form.state);
    }

    if (form.items != null) {

      ArrayList<Object> items = new ArrayList<>();

      order.put("items", items);

      if (form.items != null) {

        for (GoodsList s : form.items) {

          Goods goods = goodsService.get(s._id);

          if (goods != null && s.number > 0) {

            goods.put("number", s.number);
            items.add(goods);
          }
        }
      }
    }

    service.update(order);

    return RESTResponse.of(order).get();
  }

  @ResponseBody
  @RequestMapping(value = "/data/basket/{id}.json", method = { RequestMethod.DELETE })
  public String data_basket_$id(@PathVariable("id") String _id) {

    service.unorder(_id);
    return RESTResponse.of(null).get();
  }

  @ResponseBody
  @RequestMapping(value = "/data/basket/{id}.json", method = { RequestMethod.GET })
  public String data_basket_$id(HttpSession session,
      HttpServletRequest request, @PathVariable("id") String id)
      throws Exception {

    User user = userService.getFromSession(session);
    Basket order = service.get(id);

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
  @RequestMapping(value = "/data/basket/mine.json", method = { RequestMethod.GET })
  public String data_basket_mine(HttpSession session,
      HttpServletRequest request, @RequestParam("start") String start,
      @RequestParam("end") String end) throws Exception {

    User user = userService.getFromSession(session);

    BasketPageParam opp = new BasketPageParam();

    opp.setStart(start);
    opp.setEnd(end);
    opp.setUid(user.get_id());
    opp.setCounting(false);
    opp.setLimit(-1);

    return RESTResponse.of(service.page(opp)).get();
  }

  @ResponseBody
  @RequestMapping(value = "/data/basket/{id}/goods.json", method = { RequestMethod.PUT })
  public String data_basket_$oid_goods(@PathVariable("id") String id,
      HttpServletRequest request) throws Exception {

    ListGoodsForm form = Utils.parseJSON(request.getInputStream(),
        ListGoodsForm.class);

    List<Goods> items = new ArrayList<Goods>();

    if (form.goods.size() > 0) {

      for (GoodsForm x : form.goods) {

        Goods goods = goodsService.get(x.id);
        if (goods != null) {
          goods.put("number", x.number);
          items.add(goods);
        }
      }
    }

    service.updateGoods(id, items);

    return RESTResponse.of(service.get(id)).get();
  }
}
