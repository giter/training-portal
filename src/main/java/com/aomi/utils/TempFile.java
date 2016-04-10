package com.aomi.utils;

import java.io.Closeable;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.io.FileUtils;

public class TempFile implements Closeable {

  private final File file;

  public TempFile() throws IOException {
    file = File.createTempFile("tmp", "io");
  }

  public TempFile(InputStream in) throws IOException {
    this();
    FileUtils.copyInputStreamToFile(in, file);
  }

  @Override
  public void close() {
    if (file != null) {
      file.delete();
    }
  }

  public File file() {
    return file;
  }

}
