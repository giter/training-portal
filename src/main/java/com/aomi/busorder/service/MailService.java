package com.aomi.busorder.service;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.mail.internet.InternetAddress;

import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MailService {

  @Value("${mail.host}")
  public String host;

  @Value("${mail.account}")
  public String account;

  @Value("${mail.password}")
  public String password;

  public void mail(String name, String email, String title, String message)
      throws EmailException {

    SimpleEmail smtp = new SimpleEmail();
    smtp.setHostName(host);

    smtp.setAuthentication(account, password);

    smtp.setFrom(account);

    List<InternetAddress> m = new ArrayList<>();

    try {
      m.add(new InternetAddress(email, name));
    } catch (UnsupportedEncodingException e) {
      throw new RuntimeException(e);
    }

    smtp.setTo(m);

    smtp.setSubject(title);
    smtp.setCharset("UTF-8");
    smtp.setMsg(message);

    smtp.send();
  }
}
