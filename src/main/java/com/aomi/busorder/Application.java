package com.aomi.busorder;

import java.io.File;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.session.HashSessionManager;
import org.eclipse.jetty.server.session.SessionHandler;
import org.eclipse.jetty.webapp.WebAppContext;
import org.springframework.core.io.ClassPathResource;

public class Application {

  public static void main(String[] args) throws Exception {

    Server server = new Server(Integer.parseInt(System.getProperty("port",
        "8080")));

    WebAppContext wac = new WebAppContext();
    wac.setDefaultsDescriptor("/webdefault.xml");

    HashSessionManager localSessionManager = new HashSessionManager();
    localSessionManager.setStoreDirectory(new File("./sessions"));

    wac.setSessionHandler(new SessionHandler(localSessionManager));

    wac.setContextPath("/");
    wac.setResourceBase(new ClassPathResource("webapp").getURI().toString());

    server.setHandler(wac);

    server.start();
    server.join();
  }
}
