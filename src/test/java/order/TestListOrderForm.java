package order;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import com.aomi.busorder.form.OrderForm;
import com.aomi.busorder.misc.Utils;

public class TestListOrderForm {

  @Test
  public void testJSON() throws IOException {

    String s = "[{\"uid\":\"123\", \"id\":\"234\"}]";

    List<OrderForm> tus = Utils.parseJSONArray(
        new ByteArrayInputStream(s.getBytes()), OrderForm.class);

    Assert.assertEquals(1, tus.size());

    Assert.assertEquals(tus.get(0).id, "234");
    Assert.assertEquals(tus.get(0).uid, "123");
  }

}
