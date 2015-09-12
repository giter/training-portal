package com.aomi.busorder.misc;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

public abstract class PinYinUtils {

  private static HanyuPinyinOutputFormat OFM = null;
  private static Logger LOGGER = LoggerFactory.getLogger(PinYinUtils.class);

  private static HanyuPinyinOutputFormat getOutputFormat() {

    if (OFM == null) {
      synchronized (PinYinUtils.class) {

        if (OFM == null) {
          OFM = new HanyuPinyinOutputFormat();
          OFM.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
          OFM.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        }
      }
    }

    return OFM;
  }

  public static String capital(String s) {

    StringBuffer sb = new StringBuffer();

    if (s != null) {
      for (int i = 0; i < s.length(); i++) {
        sb.append(captial(s.charAt(i)));
      }
    }
    return sb.toString();
  }

  public static String pinyin(String s) {

    StringBuffer sb = new StringBuffer();

    if (s != null) {
      for (int i = 0; i < s.length(); i++) {
        sb.append(pinyin(s.charAt(i)));
      }
    }

    return sb.toString();
  }

  public static String pinyin(char c) {

    try {

      String[] ss = PinyinHelper.toHanyuPinyinStringArray(c, getOutputFormat());
      if (ss != null && ss.length > 0)
        return ss[0];
      return Character.toString(c);

    } catch (BadHanyuPinyinOutputFormatCombination e) {
      LOGGER.warn("取拼音出错", e);
      return Character.toString(c);
    }
  }

  public static String captial(char c) {

    try {

      String[] ss = PinyinHelper.toHanyuPinyinStringArray(c, getOutputFormat());

      String p = "";

      if (ss != null && ss.length > 0) {

        String s = ss[0];

        if (s != null && s.length() > 0) {
          p += s.charAt(0);
        }
        
        return p.toUpperCase();
      }

      return Character.toString(c).toUpperCase();

    } catch (Exception ex) {

      LOGGER.warn("取拼音出错", ex);
      return Character.toString(c).toUpperCase();
    }
  }
}