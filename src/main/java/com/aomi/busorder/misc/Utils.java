package com.aomi.busorder.misc;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;

import org.springframework.util.StreamUtils;

import com.alibaba.fastjson.JSON;

public class Utils {

  private static final Charset UTF8 = Charset.forName("UTF-8");

  public static <T> T parseJSON(InputStream in, Class<T> clazz)
      throws IOException {

    return JSON.parseObject(StreamUtils.copyToString(in, UTF8), clazz);
  }

  public static <T> T parseJSON(String s, Class<T> clazz) throws IOException {

    return JSON.parseObject(s, clazz);
  }

}
