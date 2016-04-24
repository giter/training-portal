package com.aomi.goods.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.aomi.goods.pojo.Goods;
import com.aomi.goods.vo.GoodsPageParam;
import com.aomi.restaurant.service.CRUDService;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;

@Service
public class GoodsService extends CRUDService<Goods, GoodsPageParam> {

  @Resource
  GoodsDAO DAO;

  @Override
  public DBCollection collection() {
    return DAO.goods;
  }

  @Override
  public Class<Goods> clazz() {
    return Goods.class;
  }

  @Override
  public DBObject query(GoodsPageParam param) {

    BasicDBObjectBuilder builder = BasicDBObjectBuilder.start();

    if (param != null) {

      if (param.getVisible() != null) {

        builder.add("visible", param.getVisible());
      }
    }

    return builder.get();
  }

  @Override
  public Goods insert(Goods t) {

    t.put("visible", t.getVisible());
    return super.insert(t);
  }

}
