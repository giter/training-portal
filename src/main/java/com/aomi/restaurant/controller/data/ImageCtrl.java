package com.aomi.restaurant.controller.data;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.util.Base64;
import com.aomi.busorder.misc.Utils;
import com.aomi.busorder.vo.RESTResponse;
import com.aomi.restaurant.form.ImageForm;
import com.aomi.restaurant.service.RestaurantDAO;
import com.aomi.utils.ImageCompress;
import com.aomi.utils.ScaleAction;
import com.aomi.utils.TempFile;
import com.mongodb.BasicDBObject;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSInputFile;

@Controller
public class ImageCtrl {

  @Resource
  RestaurantDAO DAO;

  @ResponseBody
  @RequestMapping(value = "/admin/data/image.json", method = { RequestMethod.POST })
  public String admin_data_image(HttpServletRequest request) throws Exception {

    // "data:image/png;base64,"

    ImageForm form = Utils.parseJSON(request.getInputStream(), ImageForm.class);

    if (form.file != null) {

      String b64 = "base64,";
      int s = form.file.indexOf(b64);

      if (s > 0) {

        String image = form.file.substring(s + b64.length());
        String id = DigestUtils.md5Hex(image);

        if (DAO.gridFS.find(new BasicDBObject("_id", id)).size() == 0) {

          byte[] img = Base64.decodeFast(image);

          String contentType = form.file.substring(0, s - 1).substring(5);
          GridFSInputFile file = DAO.gridFS.createFile(img);
          file.setId(id);
          file.setContentType(contentType);
          file.setFilename(form.name);
          file.save();
        }

        return RESTResponse.of(id).get();
      }

    }

    return null;
  }

  @RequestMapping(value = "/data/image/{id}.json", method = { RequestMethod.GET })
  public void data_image_$id(HttpServletResponse response,
      HttpServletRequest request, @PathVariable("id") String id)
      throws Exception {

    List<GridFSDBFile> files = DAO.gridFS.find(new BasicDBObject("_id", id));

    if (files.size() == 0) {
      response.sendError(HttpServletResponse.SC_NOT_FOUND);
      return;
    }

    GridFSDBFile file = files.get(0);
    response.setContentLength((int) file.getLength());
    response.setHeader("Expires", "Thu, 01 Dec 2999 16:00:00 GMT");
    response.setHeader("Content-Type", file.getContentType());

    try (InputStream in = file.getInputStream()) {
      IOUtils.copy(in, response.getOutputStream());
    }
  }

  /**
   * @param request
   * @throws Exception
   */
  @RequestMapping(value = "/data/image/{id}/{width}/{height}.json", method = { RequestMethod.GET })
  public void data_image_$id_$width_$height(HttpServletResponse response,
      HttpServletRequest request, @PathVariable("id") String id,
      @PathVariable("width") int width, @PathVariable("height") int height)
      throws Exception {

    String oid = id;

    if (width + height > 0) {

      id = id + "_" + width + "x" + height;
    }

    final String fid = id;

    List<GridFSDBFile> files = DAO.gridFS.find(new BasicDBObject("_id", id));

    if (files.size() == 0) {

      files = DAO.gridFS.find(new BasicDBObject("_id", oid));

      if (files.size() == 0) {
        response.sendError(HttpServletResponse.SC_NOT_FOUND);
        return;
      }

      final GridFSDBFile file = files.get(0);

      try (InputStream in = file.getInputStream()) {
        try (TempFile tmp = new TempFile(in)) {

          ImageCompress.scale(tmp.file(), width, height,
              new ScaleAction<GridFSInputFile>() {

                @Override
                public GridFSInputFile scaled(File t) throws IOException {

                  GridFSInputFile file = DAO.gridFS.createFile(t);
                  file.setId(fid);
                  file.setContentType("image/png");
                  file.setFilename(file.getFilename());
                  file.save();

                  return file;
                }
              });
        }
      }

      files = DAO.gridFS.find(new BasicDBObject("_id", id));
    }

    GridFSDBFile file = files.get(0);
    response.setContentLength((int) file.getLength());
    response.setHeader("Expires", "Thu, 01 Dec 2999 16:00:00 GMT");
    response.setHeader("Content-Type", file.getContentType());

    try (InputStream in = file.getInputStream()) {
      IOUtils.copy(in, response.getOutputStream());
    }
  }
}
