package com.aomi.busorder.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import me.chanjar.weixin.common.exception.WxErrorException;
import me.chanjar.weixin.common.session.WxSessionManager;
import me.chanjar.weixin.common.util.StringUtils;
import me.chanjar.weixin.mp.api.WxMpConfigStorage;
import me.chanjar.weixin.mp.api.WxMpInMemoryConfigStorage;
import me.chanjar.weixin.mp.api.WxMpMessageHandler;
import me.chanjar.weixin.mp.api.WxMpMessageRouter;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.api.WxMpServiceImpl;
import me.chanjar.weixin.mp.bean.WxMpXmlMessage;
import me.chanjar.weixin.mp.bean.WxMpXmlOutMessage;
import me.chanjar.weixin.mp.bean.WxMpXmlOutTextMessage;
import me.chanjar.weixin.mp.bean.result.WxMpUser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WeixinCtrl implements InitializingBean {

  static Logger LOGGER = LoggerFactory.getLogger(WeixinCtrl.class);

  @Value("${weixin.appId}")
  String appId;

  @Value("${weixin.secret}")
  String secret;

  @Value("${weixin.token}")
  String token;

  @Value("${weixin.aesKey}")
  String aesKey;

  protected WxMpConfigStorage storage;
  protected WxMpService service;
  protected WxMpMessageRouter router;

  public WxMpService getService() {
    return service;
  }

  @ResponseBody
  @RequestMapping(value = "/", method = { RequestMethod.GET, RequestMethod.POST })
  protected String request(HttpServletRequest request,
      HttpServletResponse response) throws ServletException, IOException {

    response.setContentType("text/html;charset=UTF-8");

    String signature = request.getParameter("signature");
    String nonce = request.getParameter("nonce");
    String timestamp = request.getParameter("timestamp");

    if (!service.checkSignature(timestamp, nonce, signature)) {

      // 消息签名不正确，说明不是公众平台发过来的消息
      LOGGER.info("非法请求");
      return null;
    }

    String echostr = request.getParameter("echostr");
    if (StringUtils.isNotBlank(echostr)) {

      return echostr;
    }

    String encryptType = StringUtils.isBlank(request
        .getParameter("encrypt_type")) ? "raw" : request
        .getParameter("encrypt_type");

    if ("raw".equals(encryptType)) {

      // 明文传输的消息
      WxMpXmlMessage inMessage = WxMpXmlMessage.fromXml(request
          .getInputStream());

      LOGGER.info(inMessage.getContent());

      WxMpXmlOutMessage outMessage = router.route(inMessage);
      return outMessage.toXml();
    }

    if ("aes".equals(encryptType)) {

      // 是aes加密的消息
      String msgSignature = request.getParameter("msg_signature");
      WxMpXmlMessage inMessage = WxMpXmlMessage.fromEncryptedXml(
          request.getInputStream(), storage, timestamp, nonce, msgSignature);

      LOGGER.info(inMessage.getContent());

      WxMpXmlOutMessage outMessage = router.route(inMessage);
      return outMessage.toEncryptedXml(storage);
    }

    LOGGER.info("不可识别的加密类型");
    return null;
  }

  @Override
  public void afterPropertiesSet() throws Exception {

    WxMpInMemoryConfigStorage config = new WxMpInMemoryConfigStorage();

    config.setAppId(appId); // 设置微信公众号的appid
    config.setSecret(secret); // 设置微信公众号的secret
    config.setToken(token); // 设置微信公众号的token
    config.setAesKey(aesKey); // 设置微信公众号的EncodingAESKey

    storage = config;

    service = new WxMpServiceImpl();
    service.setWxMpConfigStorage(storage);

    WxMpMessageHandler handler = new WxMpMessageHandler() {

      @Override
      public WxMpXmlOutMessage handle(WxMpXmlMessage wxMessage,
          Map<String, Object> context, WxMpService wxMpService,
          WxSessionManager sessionManager) throws WxErrorException {

        WxMpUser ui = wxMpService
            .userInfo(wxMessage.getFromUserName(), "zh_CN");

        WxMpXmlOutTextMessage m = WxMpXmlOutMessage.TEXT()
            .content(ui.getOpenId()).fromUser(wxMessage.getToUserName())
            .toUser(wxMessage.getFromUserName()).build();
        return m;
      }
    };

    router = new WxMpMessageRouter(service);
    router.rule().async(false).content("哈哈") // 拦截内容为“哈哈”的消息
        .handler(handler).end();
  }

}