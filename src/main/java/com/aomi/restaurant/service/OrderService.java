package com.aomi.restaurant.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.aomi.restaurant.pojo.Dish;
import com.aomi.restaurant.pojo.Order;
import com.aomi.restaurant.vo.OrderPageParam;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

@Service
public class OrderService extends CRUDService<Order, OrderPageParam> {

  @Resource
  RestaurantDAO DAO;

  @Override
  public Class<Order> clazz() {
    return Order.class;
  }

  /**
   * 退订
   * 
   * @param _id
   */
  public void unorder(String _id) {

    DAO.order.update(new BasicDBObject("_id", _id), BasicDBObjectBuilder
        .start().push("$set").add("state", -1).get());
  }

  public void updateDishes(String _id, List<Dish> dishes) {

    DAO.order.update(new BasicDBObject("_id", _id), BasicDBObjectBuilder
        .start().push("$set").add("menu", dishes).get());

  }

  @Override
  public DBObject query(OrderPageParam param) {

    BasicDBObjectBuilder builder = BasicDBObjectBuilder.start();

    if (param != null) {

      if (param.getUid() != null) {

        builder.add("user._id", param.getUid());
      }

      if (param.getStart() != null) {

        builder.push("mdate").add("$gte", param.getStart());
        if (param.getEnd() != null)
          builder.add("$lte", param.getEnd());
        builder.pop();
      } else if (param.getEnd() != null) {
        builder.push("mdate").add("$lte", param.getEnd()).pop();
      }

      if (param.getMdate() != null) {
        builder.add("mdate", param.getMdate());
      }

      if (param.getMtime() != null) {
        builder.add("mtime", param.getMtime());
      }

      if (param.getState() != null) {

        builder.add("state", param.getState());
      }

      if (param.getStates() != null) {

        builder.push("state").add("$in", param.getStates()).pop();
      }

      if (param.getTid() != null) {
        builder.add("table._id", param.getTid());
      }

    }
    return builder.get();
  }

  @Override
  public Order insert(Order t) {

    t.put("state", t.getState());

    return super.insert(t);
  }

  @Override
  public DBCollection collection() {
    return DAO.order;
  }
}
