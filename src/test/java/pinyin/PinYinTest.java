package pinyin;

import org.junit.Assert;
import org.junit.Test;

import com.aomi.busorder.misc.PinYinUtils;

public class PinYinTest {

  @Test
  public void a() {

    Assert.assertEquals(PinYinUtils.capital("中国"), "Z");
    Assert.assertEquals(PinYinUtils.capital("1中国1"), "1");
    Assert.assertEquals(PinYinUtils.capital("a中国1"), "A");
    Assert.assertEquals(PinYinUtils.capital("a中国 1a"), "A");

    Assert.assertEquals(PinYinUtils.pinyin("中国"), "zhongguo");
    Assert.assertEquals(PinYinUtils.pinyin("大季元"), "dajiyuan");
    Assert.assertEquals(PinYinUtils.pinyin("大季元-1"), "dajiyuan-1");
    Assert.assertEquals(PinYinUtils.pinyin("bb ? 大季元-1"), "bb ? dajiyuan-1");
  }
}
