package com.aomi.busorder.controller.data;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.jetty.server.Server;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aomi.busorder.vo.RESTResponse;

@Controller
public class MiscCtrl {

  static long UPTIME = System.currentTimeMillis();

  @ResponseBody
  @RequestMapping(value = "/data/system.json", method = { RequestMethod.GET })
  public String system() {

    Map<String, Object> props = new HashMap<>();

    props.put(
        "os",
        String.format("%s %s %s", System.getProperty("os.name"),
            System.getProperty("os.arch")));

    props.put("db", "MongoDB 3.0");

    props.put("web", "Jetty " + Server.getVersion());

    props.put("language", "Java " + System.getProperty("java.version"));

    props.put("status", "RUNNING");

    long millis = System.currentTimeMillis() - UPTIME;

    props.put("uptime", millis / 1000);

    props.put("memory", Runtime.getRuntime().totalMemory());

    return RESTResponse.of(props).get();

  }
}
