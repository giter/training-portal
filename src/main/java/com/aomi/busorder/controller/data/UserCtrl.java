package com.aomi.busorder.controller.data;

import java.io.IOException;
import java.net.URLEncoder;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.constant.Errors;
import com.aomi.busorder.controller.WeixinCtrl;
import com.aomi.busorder.form.BindForm;
import com.aomi.busorder.misc.Utils;
import com.aomi.busorder.param.UserParam;
import com.aomi.busorder.pojo.Authorize;
import com.aomi.busorder.pojo.User;
import com.aomi.busorder.service.AuthorizeService;
import com.aomi.busorder.service.MailService;
import com.aomi.busorder.service.UserService;
import com.aomi.busorder.vo.RESTResponse;

@Controller
public class UserCtrl {

  static Logger LOGGER = LoggerFactory.getLogger(UserCtrl.class);

  @Resource
  MailService mailService;

  @Resource
  UserService userService;

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
            + "          \"url\":\"http://www.baidu.com/\"\r\n"
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

    String openID = URLEncoder.encode(token.getOpenId(), "utf-8");

    if (user != null) {

      doLogin(session, user);
      return "redirect:/index.html";
    }

    return "redirect:/index.html?openID=" + openID + "#/bind";
  }

  void doLogin(HttpSession session, User user) {
    session.setAttribute("openID", user.getOpenID());
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
          "http://182.254.244.191/data/user/bind/%s.json", auth.get_id());

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

    if (auth == null || System.currentTimeMillis() < auth.getExpiration()) {
      return "redirect:/pc_bind_fail.html";
    }

    User user = userService.get(auth.getUid());

    if (user == null
        || (user.getOpenID() != null && !auth.getOpenID().equals(
            user.getOpenID()))) {
      return "redirect:/pc_bind_fail.html";
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

      return RESTResponse.of(Errors.UNAUTHORIZED, "尚未绑定...").toString();
    }

    return RESTResponse.of(user).toString();
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
}
