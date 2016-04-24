package com.aomi.goods.service;

import javax.annotation.Resource;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.aomi.busorder.pojo.User;
import com.aomi.goods.pojo.Basket;
import com.aomi.goods.pojo.Goods;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;

@Component
public class GoodsDAO implements InitializingBean {

  @Resource
  MongoClient client;

  @Value("${mongodb.db}")
  String dbName;

  public DBCollection goods;
  public DBCollection basket;

  @Override
  public void afterPropertiesSet() throws Exception {

    client.setWriteConcern(WriteConcern.ACKNOWLEDGED);

    goods = client.getDB(dbName).getCollection("goods");

    goods.setObjectClass(Goods.class);

    goods.createIndex(BasicDBObjectBuilder.start("visible", 1).get());

    basket = client.getDB(dbName).getCollection("basket");

    basket.setObjectClass(Basket.class);
    basket.setInternalClass("user", User.class);
    basket.setInternalClass("items", Goods.class);

    basket.createIndex(BasicDBObjectBuilder.start("state", 1).get());
    basket.createIndex(BasicDBObjectBuilder.start("mdate", 1).add("state", 1)
        .add("user._id", 1).get());
  }
}
