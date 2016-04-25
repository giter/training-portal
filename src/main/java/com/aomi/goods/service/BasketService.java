package com.aomi.goods.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.aomi.goods.pojo.Basket;
import com.aomi.goods.pojo.Goods;
import com.aomi.goods.vo.BasketPageParam;
import com.aomi.restaurant.service.CRUDService;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

@Service
public class BasketService extends CRUDService<Basket, BasketPageParam> {

  @Resource
  GoodsDAO DAO;

  @Override
  public DBCollection collection() {
    return DAO.basket;
  }

  @Override
  public Class<Basket> clazz() {
    return Basket.class;
  }

  /**
   * 退订
   * 
   * @param _id
   */
  public void unorder(String _id) {

    DAO.basket.update(new BasicDBObject("_id", _id), BasicDBObjectBuilder
        .start().push("$set").add("state", -1).get());
  }

  @Override
  public DBObject query(BasketPageParam param) {
    BasicDBObjectBuilder builder = BasicDBObjectBuilder.start();

    if (param != null) {

      if (param.getState() != null) {

        builder.add("state", param.getState());
      }

      if (param.getUid() != null) {
        builder.add("user._id", param.getUid());
      }

      if (param.getMdate() != null) {
        builder.add("mdate", param.getMdate());
      }

      if (param.getStart() != null) {

        builder.push("mdate").add("$gte", param.getStart());
        if (param.getEnd() != null)
          builder.add("$lte", param.getEnd());
        builder.pop();
      } else if (param.getEnd() != null) {
        builder.push("mdate").add("$lte", param.getEnd()).pop();
      }
    }

    return builder.get();
  }

  public void updateGoods(String _id, List<Goods> items) {

    DAO.basket.update(new BasicDBObject("_id", _id), BasicDBObjectBuilder
        .start().push("$set").add("items", items).get());

  }

  @Override
  public Basket insert(Basket t) {

    t.put("state", t.getState());
    return super.insert(t);
  }
}
