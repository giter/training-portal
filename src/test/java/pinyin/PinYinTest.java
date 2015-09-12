package pinyin;
import org.junit.Assert;
import org.junit.Test;

import com.aomi.busorder.misc.PinYinUtils;

public class PinYinTest {

  @Test
  public void a() {

    Assert.assertEquals(PinYinUtils.capital("中国"), "ZG");
    Assert.assertEquals(PinYinUtils.capital("1中国1"), "1ZG1");
    Assert.assertEquals(PinYinUtils.capital("a中国1"), "AZG1");
    Assert.assertEquals(PinYinUtils.capital("a中国 1a"), "AZG 1A");
    
    Assert.assertEquals(PinYinUtils.pinyin("中国"), "zhongguo");
    Assert.assertEquals(PinYinUtils.pinyin("大季元"), "dajiyuan");
    Assert.assertEquals(PinYinUtils.pinyin("大季元-1"), "dajiyuan-1");
    Assert.assertEquals(PinYinUtils.pinyin("bb ? 大季元-1"), "bb ? dajiyuan-1");
  }
}
