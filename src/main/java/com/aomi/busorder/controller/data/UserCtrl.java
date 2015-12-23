package com.aomi.busorder.controller.data;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import me.chanjar.weixin.common.bean.WxMenu;
import me.chanjar.weixin.common.exception.WxErrorException;
import me.chanjar.weixin.mp.bean.result.WxMpOAuth2AccessToken;

import org.apache.commons.lang3.tuple.Pair;
import org.apache.commons.mail.EmailException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.controller.WeixinCtrl;
import com.aomi.busorder.form.BindForm;
import com.aomi.busorder.form.RelationForm;
import com.aomi.busorder.misc.Errors;
import com.aomi.busorder.misc.Utils;
import com.aomi.busorder.param.UserParam;
import com.aomi.busorder.pojo.Authorize;
import com.aomi.busorder.pojo.Dept;
import com.aomi.busorder.pojo.Trace.TraceAction;
import com.aomi.busorder.pojo.User;
import com.aomi.busorder.service.AuthorizeService;
import com.aomi.busorder.service.DeptService;
import com.aomi.busorder.service.MailService;
import com.aomi.busorder.service.TraceService;
import com.aomi.busorder.service.UserService;
import com.aomi.busorder.vo.Page;
import com.aomi.busorder.vo.RESTResponse;

@Controller
public class UserCtrl {

  static Logger LOGGER = LoggerFactory.getLogger(UserCtrl.class);

  @Resource
  TraceService tracer;

  @Resource
  MailService mailService;

  @Resource
  UserService userService;
  
  @Resource
  DeptService deptService;

  @Resource
  AuthorizeService authorizeService;

  @Resource
  WeixinCtrl weixin;

  @ResponseBody
  @RequestMapping(value = "/menus/creation.json", method = { RequestMethod.GET })
  public String menusCreation() throws WxErrorException {

    WxMenu menus = WxMenu
        .fromJson("\r\n"
            + " {\r\n"
            + "  \"menu\":{\r\n"
            + "     \"button\":[\r\n"
            + "        { \r\n"
            + "          \"type\":\"view\",\r\n"
            + "          \"name\":\"在线订座\",\r\n"
            + "          \"url\":\"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7d0128b8e445ac1f&redirect_uri=http%3A%2F%2Fwww.hao3304.com%2Foauth.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect\"\r\n"
            + "        },\r\n" + "\r\n" + "        { \r\n"
            + "          \"type\":\"view\",\r\n"
            + "          \"name\":\"企业资讯\",\r\n"
            + "          \"url\":\"http://sina.cn/?from=wap/\"\r\n"
            + "        }\r\n" + "\r\n" + "        ]\r\n" + "    \r\n"
            + "  }\r\n" + "}\r\n" + "\r\n" + "");
    weixin.getService().menuCreate(menus);
    return "+OK";
  }

  @RequestMapping(value = "/oauth.html", method = { RequestMethod.GET })
  public String oauth(
      @RequestParam(value = "code", required = false) String code,
      HttpSession session) throws IOException, WxErrorException {

    WxMpOAuth2AccessToken token = weixin.getService()
        .oauth2getAccessToken(code);

    User user = userService.getByOpenID(token.getOpenId());

    String openID = token.getOpenId();

    if (user != null) {

      doLogin(session, user);
      return "redirect:/index.html";
    }

    return "redirect:/index.html?openID=" + URLEncoder.encode(openID, "utf-8")
        + "#/bind";
  }

  void doLogin(HttpSession session, User user) {

    tracer.trace(user, TraceAction.ACTION_LOGIN);

    session.setAttribute("openID", user.getOpenID());
  }

  @ResponseBody
  @RequestMapping(value = "/data/user/relation/{id}.json", method = { RequestMethod.DELETE })
  public String relation(@PathVariable("id") String id, HttpSession session,
      HttpServletRequest request) {

    String openID = (String) session.getAttribute("openID");

    User source = userService.getByOpenID(openID);

    if (openID == null || source == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定或未登录...").toString();
    }

    User user = userService.get(id);

    if (user != null && user.getRelated() != null
        && user.getRelated().equals(source.get_id())) {

      userService.remove(user.get_id());
    }

    return RESTResponse.of(user).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/user/relation.json", method = { RequestMethod.PUT })
  public String relation(HttpSession session, HttpServletRequest request)
      throws IOException {

    RelationForm form = Utils.parseJSON(request.getInputStream(),
        RelationForm.class);

    if (form == null || form.sn == null || form.name == null
        || form.relation == null) {
      return RESTResponse.of(Pair.of(false, "参数不完整，请重新输入！")).toString();
    }

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定或未登录...").toString();
    }

    if (userService.getByRelation(user.get_id(), form.sn) != null) {

      return RESTResponse.of(Pair.of(false, "已存在关联帐户，请重新输入！")).toString();
    }

    User u = new User();
    u.setName(form.name).setAge(form.age).setSex(form.sex)
        .setRelated(user.get_id()).setRelation(form.relation)
        .setType(User.TYPE_RELATION);

    return RESTResponse.of(userService.insert(u)).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/user/relations.json", method = { RequestMethod.GET })
  public String relations(HttpSession session, @ModelAttribute UserParam param)
      throws IOException {

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定或未登录...").toString();
    }

    param.setLimit(0); // NO limit!
    param.setRelatedTo(user.get_id());

    return RESTResponse.of(userService.page(param)).toString();

  }

  @ResponseBody
  @RequestMapping(value = "/data/user/unbind.json", method = { RequestMethod.GET })
  public String unbind(HttpSession session, HttpServletRequest request)
      throws IOException {

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (user != null) {

      userService.save(user.setOpenID(null));
      return RESTResponse.of("OK").toString();
    }

    return RESTResponse.of(1, "FAIL").toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/user/bind.json", method = { RequestMethod.POST })
  public String bind(HttpServletRequest request) throws IOException {

    BindForm form = Utils.parseJSON(request.getInputStream(), BindForm.class);

    if (form.email == null || form.openID == null) {
      return RESTResponse.of(Pair.of(false, "参数不完整，请重新输入！")).toString();
    }

    UserParam param = new UserParam();
    param.setLimit(2);

    param.setEmail(form.email);
    param.setLimit(2);

    List<User> users = userService.page(param);

    if (users.size() > 1) {
      return RESTResponse.of(Pair.of(false, "邮箱地址重复，请联系管理员！")).toString();
    }

    if (users.size() < 1) {
      return RESTResponse.of(Pair.of(false, "姓名或邮箱不存在，请检查！")).toString();
    }

    if (users.size() == 1 && users.get(0).getOpenID() != null) {

      String openID = users.get(0).getOpenID();

      if (openID == form.openID) {
        return RESTResponse.of(Pair.of(false, "请勿重复绑定！")).toString();
      } else {
        return RESTResponse.of(Pair.of(false, "您已成功绑定！")).toString();
      }
    }

    Authorize auth = new Authorize();

    auth.setOpenID(form.openID);
    auth.setUid(users.get(0).get_id());
    auth.setName(users.get(0).getName());
    auth.setEmail(form.email);
    auth.setExpiration(System.currentTimeMillis() + 24 * 3600 * 1000);

    auth = authorizeService.insert(auth);

    try {

      String url = String.format(
          "http://www.aomidata.com/data/user/bind/%s.json", auth.get_id());

      mailService.mail(users.get(0).getName(), form.email, "网页验证邮件！",
          String.format("请使用以下链接激活帐号： %s", url));

    } catch (EmailException e) {

      LOGGER.error("邮件发送错误", e);
      return RESTResponse.of(Pair.of(false, "系统异常，请联系管理员！")).toString();
    }

    return RESTResponse.of(Pair.of(true, "已申请绑定，请通过邮箱验证！")).toString();
  }

  @RequestMapping(value = "/data/user/bind/{id}.json", method = { RequestMethod.GET })
  public String activate(@PathVariable("id") String id) throws IOException {

    Authorize auth = authorizeService.take(id);

    if (auth == null || System.currentTimeMillis() > auth.getExpiration()) {
      return "redirect:/pc_bind_fail.html?1";
    }

    User user = userService.get(auth.getUid());

    if (user == null
        || (user.getOpenID() != null && !auth.getOpenID().equals(
            user.getOpenID()))) {
      return "redirect:/pc_bind_fail.html?2";
    }

    user.setOpenID(auth.getOpenID());
    userService.save(user);

    return "redirect:/pc_bind_success.html";
  }

  @ResponseBody
  @RequestMapping(value = "/data/user/mine.json", method = { RequestMethod.GET })
  public String back(HttpSession session) {

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定或未登录...").toString();
    }

    return RESTResponse.of(user).toString();
  }

  @ResponseBody
  @RequestMapping(value = "/data/user/delegation.json", method = { RequestMethod.GET })
  public String delegation(HttpSession session) {

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定或未登录...").toString();
    }

    List<User> users = new ArrayList<>();

    for (String s : user.getDelegation()) {

      User u = userService.get(s);

      if (u != null) {
        users.add(u);
      }
    }

    return RESTResponse.of(users).get();

  }

  @ResponseBody
  @RequestMapping(value = "/data/user/delegate-for/{uid}.json", method = { RequestMethod.POST })
  public String delegateFor(HttpSession session, @PathVariable("uid") String uid) {

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定或未登录...").toString();
    }

    User target = userService.get(uid);

    if (target == null) {
      return RESTResponse.of(Errors.NO_SUCH_ITEM, "未找到该用户...").toString();
    }

    userService.delegate(target.get_id(), user.get_id());

    return RESTResponse.of(target).get();
  }

  @ResponseBody
  @RequestMapping(value = "/data/user/delegate-for/{uid}.json", method = { RequestMethod.DELETE })
  public String undelegateAs(HttpSession session,
      @PathVariable("uid") String uid) {

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定或未登录...").toString();
    }

    User target = userService.get(uid);

    if (target == null) {
      return RESTResponse.of(Errors.NO_SUCH_ITEM, "未找到该用户...").toString();
    }

    userService.undelegate(target.get_id(), user.get_id());

    return RESTResponse.of(target).get();

  }

  @ResponseBody
  @RequestMapping(value = "/data/user/delegation/{uid}.json", method = { RequestMethod.POST })
  public String delegate(HttpSession session, @PathVariable("uid") String uid) {

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定或未登录...").toString();
    }

    User target = userService.get(uid);

    if (target == null) {
      return RESTResponse.of(Errors.NO_SUCH_ITEM, "未找到该用户...").toString();
    }

    userService.delegate(user.get_id(), target.get_id());

    return RESTResponse.of(target).get();
  }

  @ResponseBody
  @RequestMapping(value = "/data/user/delegation/{uid}.json", method = { RequestMethod.DELETE })
  public String undelegate(HttpSession session, @PathVariable("uid") String uid) {

    String openID = (String) session.getAttribute("openID");

    User user = userService.getByOpenID(openID);

    if (openID == null || user == null) {

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定或未登录...").toString();
    }

    User target = userService.get(uid);

    if (target == null) {
      return RESTResponse.of(Errors.NO_SUCH_ITEM, "未找到该用户...").toString();
    }

    userService.undelegate(user.get_id(), target.get_id());

    return RESTResponse.of(target).get();

  }

  @ResponseBody
  @RequestMapping(value = "/data/users.json", method = { RequestMethod.GET })
  public String users(@ModelAttribute UserParam param) {

    List<User> users = userService.page(param);
    long count = userService.count(param);

    return RESTResponse.of(Page.of(count, users)).get();
  }

  @RequestMapping(value = "/login.do", method = { RequestMethod.GET })
  public String login(
      @RequestParam(value = "openID", required = false) String openID,
      HttpSession session, HttpServletResponse response) throws IOException,
      WxErrorException {

    User user = userService.getByOpenID(openID);
    if (user != null) {
      doLogin(session, user);
      return "redirect:/index.html";
    }

    response.sendError(400, "Bad Request.");
    return null;
  }
  /**
   * 审批页面
   * @param open
   * @param session
   * @param response
   * @return
   * @throws IOException
   * @throws WxErrorException
   */
  @ResponseBody
  @RequestMapping(value = "/data/user/finduser.json", method = { RequestMethod.GET })
  public String finduser(
      @RequestParam(value = "openID", required = false) String open,
      HttpSession session) {
	  String openID = (String) session.getAttribute("openID");
      User user = userService.getByOpenID(openID);
      User user1=new User();
	  user1.setAdmin(1);
	  user1.setDepartment(user.getDepartment());
	  List<User> list=userService.findusers(user1);
	  List<User> users=new ArrayList();
	  List<User> users1=new ArrayList();
	  String id="";
	  if(!list.isEmpty()){
		 
		 for(int j=0;j<list.size();j++){
			 id=list.get(j).get_id();
			 if(user.getAdmin()==4){
		    	  User user2=new User();
				  user2.setCreator(id);
				  user2.setType(1);
				  user2.setZt("0");
				  users1=userService.findusers(user2);
				  users.addAll(users1);
		    	  
		      }
		 }
		 if(user.getAdmin()==4&&user.getDepartment().equals("公司办公室")){
  		   
    		 User user3=new User();
   		     user3.setType(1);
   		     user3.setZt("1");
   		     users.addAll(userService.findusers(user3));
    	  }
	  }
      

    return RESTResponse.of(users).toString();
  }
  /**
   * 全部通过
   * @param _id
   * @param session
   * @param response
   * @return
   * @throws IOException
   */
  @ResponseBody
  @RequestMapping(value = "/data/user/approveusers.json", method = { RequestMethod.GET })
  public String approveusers(
      @RequestParam(value = "_id", required = false) String _id,
      HttpSession session, HttpServletResponse response) throws IOException {
	  String openID = (String) session.getAttribute("openID");
      User user = userService.getByOpenID(openID);
      User user1=new User();
	  user1.setAdmin(1);
	  user1.setDepartment(user.getDepartment());
	  List<User> list=userService.findusers(user1);
	  List<User> users=new ArrayList();
	  List<User> users1=new ArrayList();
	  String id="";
	  if(!list.isEmpty()){
		 
		 for(int j=0;j<list.size();j++){
			 id=list.get(j).get_id();
			 if(user.getAdmin()==4){
		    	  User user2=new User();
				  user2.setCreator(id);
				  user2.setType(1);
				  user2.setZt("0");
				  users1=userService.findusers(user2);
				  users.addAll(users1);
		    	  
		      }
		 }
		 if(user.getAdmin()==4&&user.getDepartment().equals("公司办公室")){
  		   
    		 User user3=new User();
   		     user3.setType(1);
   		     user3.setZt("1");
   		     users.addAll(userService.findusers(user3));
    	  }
	  }
      for(int i=0;i<users.size();i++){
      if(user.getDepartment().equals("公司办公室")){
    	  userService.save(users.get(i).setZt("2"));  	  
      }else{
    	  userService.save(users.get(i).setZt("1")); 
      }
      }

    return RESTResponse.of(users).toString();
  }
  /**
   * 审批通过
   * @param _id
   * @param session
   * @param response
   * @return
   */
  @ResponseBody
  @RequestMapping(value = "/data/user/approveuser.json", method = { RequestMethod.GET })
  public String approveuser(
      @RequestParam(value = "_id", required = false) String _id,
      HttpSession session, HttpServletResponse response){
	  User user=new User();
	  user=userService.get(_id);
	  String openID = (String) session.getAttribute("openID");
      User user1 = userService.getByOpenID(openID);
      
      if(user1.getDepartment().equals("公司办公室")){
    	  userService.save(user.setZt("2")); 	  
      }else{
    	  userService.save(user.setZt("1")); 
      }
	  

    return RESTResponse.of(user).toString();
  }
  /**
   * 审批不通过
   * @param _id
   * @param session
   * @param response
   * @return
   */
  @ResponseBody
  @RequestMapping(value = "/data/user/unapproveuser.json", method = { RequestMethod.GET })
  public String unapproveuser(
      @RequestParam(value = "_id", required = false) String _id,
      HttpSession session, HttpServletResponse response){
	  User user=new User();
	  user=userService.get(_id);	     
      userService.save(user.setZt("3")); 	  

    return RESTResponse.of(user).toString();
  }
  /**
   * 审批详情
   * @param _id
   * @param session
   * @param response
   * @return
   */
  @ResponseBody
  @RequestMapping(value = "/data/user/findapproveuser.json", method = { RequestMethod.GET })
  public String findapproveuser(
      @RequestParam(value = "_id", required = false) String _id,
      HttpSession session, HttpServletResponse response){
	  User user=new User();
	  user=userService.get(_id);	     
	  
    return RESTResponse.of(user).toString();
  }
  /**
   * 查找所有部门
   * @param _id
   * @param session
   * @param response
   * @return
   */
  @ResponseBody
  @RequestMapping(value = "/data/user/finddepts.json", method = { RequestMethod.GET })
  public String findDept(
      @RequestParam(value = "id", required = false) String id,
      HttpSession session, HttpServletResponse response){
	  Dept dept=new Dept();
	  List<Dept> depts=deptService.finddepts(dept);
	     
	  
    return RESTResponse.of(depts).toString();
  }
  /**
   * 查找所选部门人员
   * @param _id
   * @param session
   * @param response
   * @return
   */
  @ResponseBody
  @RequestMapping(value = "/data/user/finddeptuser.json", method = { RequestMethod.GET })
  public String findDeptuser(
      @RequestParam(value = "level") Integer level,@RequestParam(value = "namea", required = false) String name,
      @ModelAttribute UserParam userParam,
      HttpSession session, HttpServletResponse response){
	 // User user=new User();
	 // if(level==2){
	//	  user.setUnit(name);
	//  }else if(level==1){
	//	  user.setDepartment(name);
	//  }
	//  List<User> users=userService.findusers(user);
	      
	  
   // return RESTResponse.of(users).toString();
    
   // UserParam userParam=new UserParam();
    User admin = userService.get(session.getAttribute("admin").toString());
  //  userParam.setName(null);
    if (admin.getAdmin() > 1) {
      userParam.setCreator(session.getAttribute("admin").toString());
    }
    if(level==2){
    	userParam.setUnit(name);
	  }else if(level==1){
		  userParam.setDepartment(name);
	  }
    return RESTResponse.of(
        Page.of(userService.count(userParam), userService.page(userParam))).toString();
  }
  
  
  /**
   * 新增或更新人员信息
   * @param _id
   * @param session
   * @param response
   * @return
   */
  @ResponseBody
  @RequestMapping(value = "/insert.json", method = { RequestMethod.GET })
  public String insertuser(
      @RequestParam(value = "name") String name, 
      @RequestParam(value = "email") String email, 
      @RequestParam(value = "mobile") String mobile,
      @RequestParam(value = "department") String department,
      @RequestParam(value = "unit") String unit,
      HttpSession session, HttpServletResponse response){
	   User user=new User();
	   user.setEmail(email);
	   List<User>list=userService.findusers(user);
	   if(list.isEmpty()){
		   user.setName(name);
		   user.setMobile(mobile);
		   user.setUnit(unit);
		   user.setDepartment(department);
		   user.setType(0);
		   user.setPassword("1234qwer");
		   userService.insert(user);
	   }else{
		   user=list.get(0);
		   user.setName(name);
		   user.setMobile(mobile);
		   user.setUnit(unit);
		   user.setDepartment(department);
		   userService.save(user);
	   }
  
    return "SUCCESS";
  }
  /**
   * 新增或更新人员信息
   * @param _id
   * @param session
   * @param response
   * @return
   */
  @ResponseBody
  @RequestMapping(value = "/delete.json", method = { RequestMethod.GET })
  public String deleteuser(
    
      @RequestParam(value = "email") String email,     
      HttpSession session, HttpServletResponse response){
	   User user=new User();
	   user.setEmail(email);
	   List<User>list=userService.findusers(user);
	   if(!list.isEmpty()){
		user= list.get(0);
		userService.remove(user.get_id());
	   }
  
    return "SUCCESS";
  }
}
