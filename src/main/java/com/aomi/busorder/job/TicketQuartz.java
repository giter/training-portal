package com.aomi.busorder.job;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.aomi.busorder.service.TicketService;

@Component
@Lazy(false)
public class TicketQuartz {

  static Logger LOGGER = LoggerFactory.getLogger(TicketQuartz.class);

  @Resource
  TicketService ticketService;

  /**
   * 车票生成作业，提前生成N天的车票，每天0点执行
   */
  @Scheduled(cron = "30 0 0 * * ?")
  public void generate() {

    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    Calendar cal = Calendar.getInstance();
    cal.add(Calendar.DATE, 1);

    String date = sdf.format(cal.getTime());


    LOGGER.info(String.format("Clean old ticket %s", date));
    ticketService.clean(date);

    for (int i = 0; i < 7; i++) {

      int num = ticketService.generateAll(sdf.format(cal.getTime()));
      LOGGER.info(String.format("Generate %d ticket on %s", num, date));

      cal.add(Calendar.DATE, 1);
    }
  }
}
