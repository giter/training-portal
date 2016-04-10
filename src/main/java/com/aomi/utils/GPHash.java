package com.aomi.utils;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.PixelGrabber;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

/**
 * Google's Picture Hash Algorithm
 * 
 * @see http 
 *      ://www.hackerfactor.com/blog/index.php?/archives/432-Looks-Like-It.html
 * 
 * @author jjli@yiyantang.cn
 */
public class GPHash {

  static int HEIGHT = 8;
  static int WIDTH = 8;
  static int AREA = HEIGHT * WIDTH;

  static int K = 20;
  static int HHEIGHT = 255;
  static int HWIDTH = 255;
  static int HASH_BITS = 16;
  static char[] HEXES = new char[] { '0', '1', '2', '3', '4', '5', '6', '7',
      '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

  private static int[] distribute(BufferedImage bi, int w, int h, int k) {

    int[] c = new int[256 / k + 1];

    for (int x = 0; x < w; x++) {
      for (int y = 0; y < h; y++) {
        c[getGray(bi.getRGB(x, y)) / k]++;
      }
    }

    return c;
  }

  private static int getGray(int rgb) {
    return (((rgb >> 16) & 0xFF) + ((rgb >> 8) & 0xFF) + ((rgb) & 0xFF)) / 3;
  }

  /**
   * Hamming Distance between two long val
   */
  public static int hamdist(long a, long b) {
    return Long.bitCount(a ^ b);
  }

  /**
   * Google's pic hash algorithm 8x8 version
   */
  public static long hash64(File file) throws IOException {
    return hash64(ImageIO.read(file));
  }

  /**
   * Google's pic hash algorithm 8x8 version
   */
  public static long hash64(Image img) {

    img = img.getScaledInstance(WIDTH, HEIGHT, Image.SCALE_AREA_AVERAGING);
    int px[] = new int[AREA];

    PixelGrabber pg = new PixelGrabber(img, 0, 0, WIDTH, HEIGHT, px, 0, WIDTH);

    try {
      pg.grabPixels();
    } catch (InterruptedException e) {
      throw new RuntimeException("Grab interrupted!", e);
    }

    double av = 0;
    for (int i = 0; i < AREA; i++) {
      av += (px[i] = (int) (0.3 * ((px[i] >> 16) & 0xFF) + 0.59
          * ((px[i] >> 8) & 0xFF) + 0.11 * ((px[i]) & 0xFF)));
    }
    av /= AREA;

    long r = 0;

    for (int i = 0; i < AREA; i++) {
      r = (r << 1) | (px[i] > av ? 1 : 0);
    }

    return r;
  }

  /**
   * Google's pic hash algorithm 8x8 version
   */
  public static long hash64(InputStream in) throws IOException {
    return hash64(ImageIO.read(in));
  }

  public static double hdist(String a, String b) {

    double x = 0;
    double y = 0;
    double z = 0;

    int length = a.length();

    for (int i = 0; i < length; i += 4) {

      int m = Integer.parseInt(a.substring(i, i + 3), 16);
      int n = Integer.parseInt(b.substring(i, i + 3), 16);

      x += m * n;
      y += m * m;
      z += n * n;
    }

    return x / (Math.sqrt(y * z));
  }

  /*
   * hist gram based algorithm for image simility analysis
   */
  public static String hhash(File in) throws IOException {
    return hhash(ImageIO.read(in));
  }

  /*
   * hist gram based algorithm for image simility analysis
   */
  public static String hhash(Image img) {

    StringBuilder value = new StringBuilder();

    for (int i : distribute(toBufferedImage(img.getScaledInstance(HHEIGHT,
        HWIDTH, Image.SCALE_AREA_AVERAGING)), HWIDTH, HHEIGHT, K)) {
      for (int j = HASH_BITS - 4; j >= 0; j -= 4) {
        value.append(HEXES[(i >> j) & 0xf]);
      }
    }

    return value.toString();

  }

  /*
   * hist gram based algorithm for image simility analysis
   */
  public static String hhash(InputStream in) throws IOException {
    return hhash(ImageIO.read(in));
  }

  private static BufferedImage toBufferedImage(Image image) {

    int w = image.getWidth(null);
    int h = image.getHeight(null);

    BufferedImage bi = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);

    Graphics graphics = bi.getGraphics();
    graphics.drawImage(image, 0, 0, w, h, null);
    graphics.dispose();

    return bi;
  }
}
