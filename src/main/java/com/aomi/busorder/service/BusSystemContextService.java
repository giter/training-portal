package com.aomi.busorder.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.aomi.busorder.misc.Utils;

@Service
public class BusSystemContextService implements InitializingBean {

  public static class BusSystemContext {

    /**
     * 最小开启台数
     */
    public int least = 1;

    /**
     * 最大开启台数
     */
    public int maximum = 9999;

    /**
     * 上座率低限
     */
    public double percentage = 0.9;
  }

  static File cf = new File("./context.json");

  BusSystemContext context;

  public BusSystemContext get() {

    return context;
  }

  public synchronized BusSystemContext save(BusSystemContext context)
      throws IOException {

    FileUtils.write(cf, JSON.toJSONString(context));
    this.context = context;

    return context;
  }

  @Override
  public void afterPropertiesSet() throws Exception {

    this.context = new BusSystemContext();

    try (FileInputStream fis = new FileInputStream(cf)) {
      this.context = Utils.parseJSON(fis, BusSystemContext.class);
    }
  }
}
