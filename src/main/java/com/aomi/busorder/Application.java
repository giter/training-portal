package com.aomi.busorder;

import java.io.File;
import java.io.IOException;
import java.util.regex.Pattern;

import javax.servlet.ServletException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.server.session.HashSessionManager;
import org.eclipse.jetty.webapp.WebAppContext;
import org.springframework.core.io.ClassPathResource;

public class Application {

  static Pattern RESOURCES = Pattern
      .compile("\\.(html|jpg|gif|png|js|css|ttf|json|mp4|flv)$");

  public static void main(String[] args) throws Exception {

    Server server = new Server(Integer.parseInt(System.getProperty("port",
        "8080")));

    WebAppContext wac = new WebAppContext();

    HashSessionManager localSessionManager = new HashSessionManager();
    localSessionManager.setStoreDirectory(new File("./sessions"));
    localSessionManager.setIdleSavePeriod(5);

    wac.getSessionHandler().setSessionManager(localSessionManager);

    wac.setContextPath("/");
    wac.setResourceBase(new ClassPathResource("webapp").getURI().toString());

    wac.setDefaultsDescriptor("/webdefault.xml");
    server.setHandler(wac);

    HandlerCollection handlers = new HandlerCollection() {

      @Override
      public void handle(String target, Request baseRequest,
          HttpServletRequest request, HttpServletResponse response)
          throws IOException, ServletException {

        response.setCharacterEncoding("UTF-8");

        Handler[] handlers = getHandlers();

        if (handlers != null && isStarted()) {
          for (Handler handler : handlers) {
            handler.handle(target, baseRequest, request, response);
            if (baseRequest.isHandled()) {
              return;
            }
          }
        }
      }
    };

    handlers.addHandler(wac);
    server.setHandler(handlers);

    server.start();
    server.join();
  }
}
