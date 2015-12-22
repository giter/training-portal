package com.aomi.busorder.service;


import java.util.List;
import javax.annotation.Resource;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;
import com.aomi.busorder.pojo.Dept;
import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

@Service
public class DeptService implements InitializingBean {

  @Resource
  MongoDAO dao;

  public Dept get(String id) {

    return (Dept) dao.user.findOne(id);
  }
 
  
  public Dept insert(Dept dept) {

	  dept.set_id(new ObjectId().toHexString());
	  dept.setCreated(System.currentTimeMillis());
	  dept.setUpdated(System.currentTimeMillis());

    dao.dept.insert(dept);
    return dept;
  }

  public Dept save(Dept dept) {

	  dept.setUpdated(System.currentTimeMillis());
    dao.dept.save(dept);

    return dept;
  }

  /**
   * 删除用户
   * 
   * @param id
   * @return 已删除的用户
   */
  public Dept remove(String id) {

	  Dept dept = (Dept) dao.dept.findAndRemove(BasicDBObjectBuilder.start("id",
        id).get());

   
    return dept;
  }

  public List<DBObject> items() {

    return dao.dept.find().toArray();
  }

  
  
  @SuppressWarnings("unchecked")
  public List<Dept> finddepts(Dept dept) {

    DBCursor cursor = dao.dept.find(dept);    
    List<?> depts = cursor.toArray();

    return (List<Dept>) depts;
  }



@Override
public void afterPropertiesSet() throws Exception {
	
	
}

}
