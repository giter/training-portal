package com.aomi.busorder.job;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.aomi.busorder.Ldap.DUser;
import com.aomi.busorder.Ldap.Department;
import com.aomi.busorder.Ldap.Usera;
import com.aomi.busorder.Ldap.LdapService;
import com.aomi.busorder.pojo.User;
import com.aomi.busorder.service.TicketService;
import com.aomi.busorder.service.UserService;

@Component
@Lazy(false)
public class TicketQuartz {

  static Logger LOGGER = LoggerFactory.getLogger(TicketQuartz.class);
  @Resource
  UserService userService;
  @Resource
  TicketService ticketService;

  /**
   * 车票生成作业，提前生成N天的车票，每天0点执行
   */
  @Scheduled(cron = "30 14 13 * * ?")
  public void generate() {

	  SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

	    Calendar cal = Calendar.getInstance();

	    String date = sdf.format(cal.getTime());

	    LOGGER.info(String.format("Clean old ticket %s", date));
	    ticketService.clean(date);

	    for (int i = 0; i < 10; i++) {

	      cal.add(Calendar.DATE, 1);

	      int num = ticketService.generateAll(sdf.format(cal.getTime()));
	      LOGGER.info(String.format("Generate %d ticket on %s", num,
	          sdf.format(cal.getTime())));

	    }

   
	  LdapService a=new LdapService();
	  List<Usera>users=a.getUserInfo();
		List<DUser>dusers=a.getDeptInfoa(0);
		
		List<Department> departmentList=a.getDeptInfo(0);
		
		List<Department> departmentList1=a.getDeptInfo(1, departmentList);
		List<User> list=new ArrayList<User>();
		
		for(int i=0;i<users.size();i++){
			users.get(i).getEmail();
			User user=new User();
			user.setEmail(users.get(i).getEmail());
			List<User>ulist=userService.findusers(user);
			if(ulist.size()==0){
				user.setPassword("qwer");
				user.setName(users.get(i).getUserName());
				for(int j=0;j<dusers.size();j++){
					if(dusers.get(j).getUID().equals(users.get(i).getUid())){
						for(int k=0;k<departmentList1.size();k++){
							if(dusers.get(j).getDID().equals(departmentList1.get(k).getDID())){
								user.setUnit(departmentList1.get(k).getDepartmentName());
								if(departmentList1.get(k).getLevel()==3){
									for(int g=0;g<departmentList1.size();g++){
										if(departmentList1.get(g).getDID().equals(departmentList1.get(k).getParentID())){
											user.setDepartment(departmentList1.get(g).getDepartmentName());
										}
									}
								}
							}
						}
						
					}
				}
				list.add(user);
				if(user!=null){
				if(user.getUnit()!=null&&!user.getUnit().equals("")){
				userService.insert(user);
				}
				}
			}
		}
		System.out.println("Number: " + list.size());
  }
  
 
  
}
