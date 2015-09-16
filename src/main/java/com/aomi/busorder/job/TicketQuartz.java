package com.aomi.busorder.job;

import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Lazy(false)
public class TicketQuartz {

  /**
   * 车票生成作业，提前生成N天的车票
   */
  @Scheduled(cron = "0 0 23 * * ?")
  public void generate() {

  }
}
