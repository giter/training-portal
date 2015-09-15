package com.aomi.busorder.service;

import java.util.List;

import javax.annotation.Resource;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.aomi.busorder.param.UserParam;
import com.aomi.busorder.pojo.User;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBObject;

@Service
public class UserService {

  @Resource
  MongoDAO dao;

  /***
   * 用户绑定
   */
  public void bind() {
    throw new UnsupportedOperationException();
  }

  /***
   * 用户解绑
   */
  public void unbind(String _id) {
    throw new UnsupportedOperationException();
  }

  public User get(String _id) {

    return (User) dao.user.findOne(_id);
  }

  public User insert(User user) {

    user.set_id(new ObjectId().toHexString());
    user.setCreated(System.currentTimeMillis());
    user.setUpdated(System.currentTimeMillis());

    dao.user.insert(user);
    return user;
  }

  public User save(User user) {

    user.setUpdated(System.currentTimeMillis());
    dao.user.save(user);

    return user;
  }

  public User remove(String _id) {

    return (User) dao.user.findAndRemove(BasicDBObjectBuilder.start("_id", _id)
        .get());
  }

  public List<DBObject> items() {

    return dao.user.find().toArray();
  }

  public DBObject query(UserParam param) {

    BasicDBObjectBuilder ob = BasicDBObjectBuilder.start();

    if (param == null)
      return ob.get();

    if (param.type != null)
      ob.add("type", param.type);

    return ob.get();
  }

  public List<DBObject> page(UserParam param, int page, int limit) {

    return dao.user.find(query(param))
        .sort(BasicDBObjectBuilder.start("_id", -1).get()).limit(limit)
        .skip(limit * page).toArray();
  }

  public long count(UserParam param) {

    return dao.user.count(query(param));
  }

}
