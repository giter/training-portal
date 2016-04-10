package com.aomi.utils;

import java.io.File;
import java.io.IOException;

public interface ScaleAction<T> {
  public T scaled(File t) throws IOException;
}