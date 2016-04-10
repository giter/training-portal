package com.aomi.utils;

/**
 * CP.java
 * @copyright 亿言堂(yeeyantang.com)版权所有
 * @since 0.1
 */

/**
 * ImageCompress 提供用户将大图片按比例压缩为小图片，支持JPG
 * author ljwang@yeeyantang.com
 * @see java.awt.image.BufferedImage
 */
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class ImageCompress {

  private static final Logger logger = LoggerFactory
      .getLogger(ImageCompress.class);

  public static boolean IS_IMAGEMAGICK_EXISTS = false;
  public static String PATH_IMAGEMAGICK = "";

  static {

    String os = System.getProperty("os.name").toLowerCase();
    String exec = "convert";
    String[] dirs = null;

    boolean isWindows = os.contains("windows");
    if (isWindows) {
      dirs = System.getenv("PATH").split(";");
      exec = "convert.exe";
    } else {
      dirs = System.getenv("PATH").split(":");
    }

    for (String p : dirs) {

      File dir = new File(p);

      if (dir.isDirectory()) {

        File path = new File(dir, exec);

        if (path.exists() && path.isFile()) {

          if (isWindows
              && path.getAbsolutePath().toLowerCase().contains("system32")) {
            continue; // 硬编码。WINDOWS有个自己的Convert.exe做磁盘格式转换
          }

          IS_IMAGEMAGICK_EXISTS = true;
          PATH_IMAGEMAGICK = path.getAbsolutePath();

          break;
        }
      }
    }

    if (!IS_IMAGEMAGICK_EXISTS) {
      logger
          .warn("No ImageMagick executable found!System performance will be poor if do image scale!");
    }
  }

  public static final String TARGET_FORMAT = "jpg";

  // /**
  // * 按比例缩放图片，不合比例的部分自动剪裁(取中间点)
  // *
  // * @param in
  // * 输入流
  // * @param out
  // * 输出流
  // * @param w
  // * 裁剪宽度
  // * @param h
  // * 裁剪高度
  // * @throws IOException
  // */
  // public static void cutAndScale(InputStream in, File file, int w, int h)
  // throws IOException {
  //
  // Image image = null;
  //
  // try {
  // image = ImageIO.read(in);
  // } catch (IllegalArgumentException e) {
  // throw new IOException(e);
  // }
  //
  // cutAndScale(image, file, w, h);
  // }

  // /**
  // * 按比例缩放图片，不合比例的部分自动剪裁(取中间点)
  // *
  // * @param image
  // * 输入图片
  // * @param out
  // * 输出流
  // * @param w
  // * 裁剪宽度
  // * @param h
  // * 裁剪高度
  // * @throws IOException
  // */
  // public static void cutAndScale(Image image, File file, int w, int h)
  // throws IOException {
  //
  // if (image == null) {
  // throw new IOException("image does not exist.");
  // }
  //
  // int iw = image.getWidth(null);
  // int ih = image.getHeight(null);
  //
  // double _h = 0, _w = 0;
  //
  // if (w * (long) ih != iw * (long) h) {
  //
  // _h = ih - h * (long) iw / (w * 1.0);
  //
  // if (_h < 0) {
  // _h = 0;
  // _w = iw - ih * (long) w / (h * 1.0);
  // }
  // }
  //
  // if (_h + _w != 0.0) {
  //
  // CropImageFilter cif = new CropImageFilter((int) (_w / 2),
  // (int) (_h / 2), (int) (iw - _w / 2), (int) (ih - _h / 2));
  //
  // image = Toolkit.getDefaultToolkit().createImage(
  // new FilteredImageSource(image.getSource(), cif));
  // }
  //
  // image = image.getScaledInstance(w, h, Image.SCALE_SMOOTH);
  //
  // try (FileOutputStream fos = new FileOutputStream(file)) {
  // ImageIO.write(toBufferedImage(image), TARGET_FORMAT, fos);
  // }
  //
  // }

  protected static BufferedImage toBufferedImage(Image image) {

    int w = image.getWidth(null);
    int h = image.getHeight(null);

    BufferedImage bi = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);

    Graphics graphics = bi.getGraphics();
    graphics.drawImage(image, 0, 0, w, h, Color.WHITE, null);
    graphics.dispose();

    return bi;

  }

  /**
   * 等比例缩放，缩放到mheight或mwidth
   * 
   * @param in
   *          输入流
   * @param file
   *          输出文件
   * @param mwidth
   *          最大宽度
   * @param mheight
   *          最大高度
   * 
   * @throws IOException
   */
  private static void scale(InputStream in, File file, int mwidth, int mheight)
      throws IOException {

    try (FileOutputStream fos = new FileOutputStream(file)) {

      Image image = null;

      try {
        image = ImageIO.read(in);
      } catch (IllegalArgumentException e) {
        throw new IOException(e);
      }

      if (image == null) {
        throw new IOException("image does not exist.");
      }

      int iw = image.getWidth(null);
      int ih = image.getHeight(null);

      int _w = iw;
      int _h = ih;

      if (!(iw <= mwidth && ih <= mheight)) {
        if ((mwidth / (double) iw * ih) < mheight) {
          _w = mwidth;
          _h = (int) (mwidth / (double) iw * ih);
        } else {
          _w = (int) (mheight / (double) ih * iw);
          _h = mheight;
        }
      }

      if (_w != iw && _h != ih) {
        image = image.getScaledInstance(_w, _h, Image.SCALE_SMOOTH);
      }

      ImageIO.write(toBufferedImage(image), TARGET_FORMAT, fos);
    }
  }

  protected static File scale(File source, File dest, int mwidth, int mheight)
      throws IOException {

    if (IS_IMAGEMAGICK_EXISTS) {

      String cmd = String.format(
          "%s -format jpg -strip -quality 90 -resize %dx%d> %s %s",
          PATH_IMAGEMAGICK, mwidth, mheight, source.getAbsolutePath(),
          dest.getAbsolutePath());
      try {

        int nret = Runtime.getRuntime().exec(cmd).waitFor();

        if (nret != 0) {
          throw new IOException("Error converting file!");
        }

      } catch (InterruptedException e) {
        throw new IOException("Interrupted!", e);
      }

    } else {
      try (FileInputStream fin = new FileInputStream(source)) {
        scale(fin, dest, mwidth, mheight);
      }
    }

    return dest;
  }

  public static <T> T scale(File source, int mwidth, int mheight,
      ScaleAction<T> action) throws IOException {
    try (TempFile tf = new TempFile()) {
      return action.scaled(scale(source, tf.file(), mwidth, mheight));
    }
  }

  // public static void main(String[] args) throws IOException {
  // scale(new File("c:/1.jpg"), 300, 300, new ScaleAction<String>() {
  // @Override
  // public String scaled(File t) throws IOException {
  // FileUtils.copyFile(t, new File("C:/3.jpg"));
  // return null;
  // }
  // });
  // }
}
