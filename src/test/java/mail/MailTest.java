package mail;

import org.apache.commons.mail.EmailException;

import com.aomi.busorder.service.MailService;

public class MailTest {

  public static void main(String[] args) throws EmailException {

    MailService ms = new MailService();

    ms.host = "mail.hnpc.cc";
    ms.account = "mailservice@hnpc.cc";
    ms.password = "HNPCadmin1";
    ms.mail("李佳杰", "40449926@qq.com", "Hello World!", "!@#$");
  }
}
