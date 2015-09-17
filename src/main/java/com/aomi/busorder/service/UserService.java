package com.aomi.busorder.service;

import java.util.List;

import javax.annotation.Resource;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.aomi.busorder.param.UserParam;
import com.aomi.busorder.pojo.User;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

@Service
public class UserService {

  @Resource
  MongoDAO dao;

  /***
   * 用户绑定
   */
  public void bind(String email, String openID) {

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

  public User getByOpenID(String openID) {

    if (openID == null)
      return null;
    
    return (User) dao.user
        .findOne(new BasicDBObject(User.FIELD_OPENID, openID));
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

    if (param.getType() != null)
      ob.add(User.FIELD_TYPE, param.getType());

    if (param.getCompany() != null) {
      ob.add(User.FIELD_COMPANY, param.getCompany());
    }

    if (param.getHasCompany() != null) {
      ob.push(User.FIELD_COMPANY).add("$exists", true).pop();
    }

    if (param.getEmail() != null) {
      ob.add(User.FIELD_EMAIL, param.getEmail());
    }

    if (param.getName() != null) {
      ob.add(User.FIELD_NAME, param.getName());
    }

    if (param.getOpenID() != null) {
      ob.add(User.FIELD_OPENID, param.getOpenID());
    }

    return ob.get();
  }

  @SuppressWarnings("unchecked")
  public List<User> page(UserParam param) {

    DBCursor cursor = dao.user.find(query(param)).sort(
        BasicDBObjectBuilder.start("_id", -1).get());

    if (param != null && param.getLimit() > 0) {
      cursor.limit(param.getLimit());
    }

    if (param != null && param.getPage() > 0) {
      cursor.skip(param.getLimit() * param.getPage());
    }

    List<?> users = cursor.limit(param.getLimit()).toArray();

    return (List<User>) users;
  }

  public long count(UserParam param) {

    return dao.user.count(query(param));
  }

}
