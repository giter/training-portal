package com.aomi.busorder.controller;

import java.io.IOException;
import java.util.Map;
import java.net.URLEncoder;
import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.pojo.User;
import com.aomi.busorder.service.UserService;
import com.aomi.busorder.vo.RESTResponse;

@Controller
public class WeixinCtrl implements InitializingBean {

    @Resource
    UserService userService;

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
    @RequestMapping(value = "/get_user_info.json", method = { RequestMethod.GET,
            RequestMethod.POST })
    protected String request(
            @RequestParam(value = "openID", required = false) String openID,
            HttpServletRequest request, HttpServletResponse response,
            HttpSession session) throws ServletException, IOException,
            WxErrorException {

        if (openID == null) {

            User user = userService.getFromSession(session);

            if (user != null) {
                openID = user.getOpenID();
            }
        }

        if (openID == null) {
            return RESTResponse.of(null).toString();
        }

        return RESTResponse.of(service.userInfo(openID, "zh_CN")).toString();
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
            if(outMessage != null){
                return outMessage.toXml();
            }else{
                return null;
            }
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
//        WxMpUser ui = wxMpService
//                .userInfo(wxMessage.getFromUserName(), "zh_CN");

                if(wxMessage.getMsgType().equals("event")){
                    if(wxMessage.getEvent().equals("CLICK")){

                        String key = wxMessage.getEventKey();
                        String Name;

                        if(key.equals("/index.html")){
                            Name = "订车";
                        }else if(key.equals("order/index.html")){
                            Name = "订餐";
                        }else{
                            Name = "订货";
                        }

                        //do something
                        try{
                            WxMpXmlOutTextMessage m = WxMpXmlOutMessage.TEXT()
                                    .content("尊敬的用户，请点击<a href='http://weixin.hnpc.cc/login.do?openID="+URLEncoder.encode(wxMessage.getFromUserName(), "utf-8") +"&redirect="+ URLEncoder.encode(key, "utf-8")+"'>这里</a>进入"+Name+"服务。").fromUser(wxMessage.getToUserName())
                                    .toUser(wxMessage.getFromUserName()).build();
                        }catch(Exception e){ 
                            throw new RuntimeException(e); 
                        }

                        return m;
                    }
                }

//
//        WxMpXmlOutTextMessage m = WxMpXmlOutMessage.TEXT()
//            .content(ui.getOpenId()).fromUser(wxMessage.getToUserName())
//            .toUser(wxMessage.getFromUserName()).build();
//        return m;
                return  null;
            }
        };

        router = new WxMpMessageRouter(service);
        router.rule().async(false).event("CLICK") // 拦截内容为“哈哈”的消息
                .handler(handler).end();
    }

}