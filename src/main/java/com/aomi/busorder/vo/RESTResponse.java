package com.aomi.busorder.vo;

import com.alibaba.fastjson.JSONObject;

public class RESTResponse<T> {

  public int Code;
  public String Message;

  public T Response;

  public RESTResponse(int Code, String Message, T Response) {

    this.Code = Code;
    this.Response = Response;
    this.Message = Message;
  }

  public static <V> RESTResponse<V> of(V Response) {

    return new RESTResponse<V>(0, null, Response);
  }

  public static <V> RESTResponse<V> of(int Code, String Message) {

    return new RESTResponse<V>(0, Message, null);
  }

  public String toString() {

    return JSONObject.toJSONString(this);
  }
}
