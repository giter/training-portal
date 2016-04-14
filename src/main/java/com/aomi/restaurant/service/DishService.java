package com.aomi.restaurant.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.aomi.restaurant.pojo.Dish;
import com.aomi.restaurant.vo.DishPageParam;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

@Service
public class DishService extends CRUDService<Dish, DishPageParam> {

  @Resource
  RestaurantDAO DAO;

  @Override
  public Class<Dish> clazz() {
    return Dish.class;
  }

  /**
   * 点赞
   * 
   * @param id
   */
  public void plus(String id) {

    DAO.dish.update(new BasicDBObject("_id", id), new BasicDBObject("$inc",
        new BasicDBObject("star", 1)));
  }

  @Override
  public DBObject query(DishPageParam param) {

    BasicDBObjectBuilder builder = BasicDBObjectBuilder.start();

    if (param != null) {

      if (param.getVisible() != null) {

        builder.add("visible", param.getVisible());
      }
    }

    return builder.get();
  }

  @Override
  public Dish insert(Dish t) {

    t.put("visible", t.getVisible());
    return super.insert(t);
  }

  @Override
  public DBCollection collection() {
    return DAO.dish;
  }
}
