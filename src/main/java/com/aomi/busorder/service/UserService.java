package com.aomi.busorder.service;

import java.util.List;

import javax.annotation.Resource;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import com.aomi.busorder.param.UserParam;
import com.aomi.busorder.pojo.User;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

@Service
public class UserService implements InitializingBean {

  @Resource
  MongoDAO dao;

  public void relate(String source, String target, String relation) {

    DBObject query = new BasicDBObject("_id", source);
    DBObject modifier = BasicDBObjectBuilder.start().push("$set")
        .add(User.FIELD_RELATED, target).add(User.FIELD_RELATION, target).pop()
        .get();

    dao.user.update(query, modifier);
  }

  public void unrelate(String source, String target) {

    DBObject query = new BasicDBObject("_id", source);
    DBObject modifier = BasicDBObjectBuilder.start().push("$unset")
        .add(User.FIELD_RELATED, 1).add(User.FIELD_RELATION, 1).pop().get();

    dao.user.update(query, modifier);
  }

  public void delegate(String source, String target) {

    DBObject query = new BasicDBObject("_id", source);

    DBObject modifier = BasicDBObjectBuilder.start().push("$addToSet")
        .add(User.FIELD_DELEGATION, target).pop().get();

    dao.user.update(query, modifier);
  }

  public void undelegate(String source, String target) {

    DBObject query = new BasicDBObject("_id", source);

    DBObject modifier = BasicDBObjectBuilder.start().push("$pull")
        .add(User.FIELD_DELEGATION, target).pop().get();

    dao.user.update(query, modifier);
  }

  public User get(String _id) {

    return (User) dao.user.findOne(_id);
  }

  public User getByAccount(String email, String password) {

    if (email == null || password == null)
      return null;

    DBObject query = BasicDBObjectBuilder.start(User.FIELD_EMAIL, email)
        .add(User.FIELD_PASSWORD, password).get();

    return (User) dao.user.findOne(query);
  }

  public User getByOpenID(String openID) {

    if (openID == null)
      return null;

    return (User) dao.user
        .findOne(new BasicDBObject(User.FIELD_OPENID, openID));
  }

  public User getByRelation(String related, String sn) {

    return (User) dao.user.findOne(BasicDBObjectBuilder.start()
        .add(User.FIELD_TYPE, User.TYPE_RELATION)
        .add(User.FIELD_RELATED, related).add(User.FIELD_SN, sn).get());
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

  /**
   * 删除用户
   * 
   * @param _id
   * @return 已删除的用户
   */
  public User remove(String _id) {

    User user = (User) dao.user.findAndRemove(BasicDBObjectBuilder.start("_id",
        _id).get());

    if (user.getRelated() != null) {
      unrelate(user.getRelated(), user.get_id());
    }

    return user;
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

    if (param.getUnit() != null) {
      ob.add(User.FIELD_UNIT, param.getUnit());
    }

    if (param.getBookType() != null) {
      ob.add(User.FIELD_BOOKTYPE, param.getBookType());
    }

    if (param.getDepartment() != null) {
      ob.add(User.FIELD_DEPARTMENT, param.getDepartment());
    }

    if (param.getDelegateTo() != null) {
      ob.add(User.FIELD_DELEGATION, param.getDelegateTo());
    }

    if (param.getOpenID() != null) {
      ob.add(User.FIELD_OPENID, param.getOpenID());
    }

    if (param.getRelatedTo() != null) {
      ob.add(User.FIELD_RELATED, param.getRelatedTo());
      ob.add(User.FIELD_TYPE, User.TYPE_RELATION);
    }

    if (param.getCreator() != null) {

      ob.add(User.FIELD_CREATOR, param.getCreator());
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

    List<?> users = cursor.toArray();

    return (List<User>) users;
  }

  public long count(UserParam param) {

    return dao.user.count(query(param));
  }

  @Override
  public void afterPropertiesSet() throws Exception {

    User user = get("55f984c7e4b0e4c8861ddf4e");

    if (user == null) {

      user = new User();

      user.set_id("55f984c7e4b0e4c8861ddf4e");
      user.setAdmin(1);

      user.setEmail("admin");
      user.setName("系统管理员");
      user.setPassword("p853wxspobascedh");
      user.setType(0);
      user.setCreated(System.currentTimeMillis());

      save(user);
    }
  }

}
