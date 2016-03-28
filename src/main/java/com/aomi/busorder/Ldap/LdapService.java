package com.aomi.busorder.Ldap;

import java.util.ArrayList;
import java.util.List;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.SearchResult;


public class LdapService {
	
	
	
	 public  List<Department> getDeptInfo(int i,List<Department> departmentList){
	        String searchFilter = "(&(ou=*)(isValid=true)(isCNNP=true))";
	        String searchBase = "ou=07,cn=HN,DC=CNNP,DC=COM";
	        int totalResults = 0;
	        String[] returnedAtts = {"ou", "cn", "level", "name", "description", "ibm-memberGroup", "member"}; // 定制返回属性
	        LdapQuery ldapQuery = new LdapQuery();
	        ldapQuery.setSearchFilter(searchFilter);
	        ldapQuery.setSearchBase(searchBase);
	        ldapQuery.setReturnedAtts(returnedAtts);
	        List<DUser> dUserList = new ArrayList<DUser>();
	        List<Department> departmentList1 = new ArrayList<Department>();
	        try {
	            NamingEnumeration answer = ldapQuery.GetADInfo();
	            while (answer.hasMoreElements()) {
	            //	dUserList.clear();
	                SearchResult sr = (SearchResult) answer.next();
	                Department department = new Department();
	                String ou = "";
	                //获取一条记录
	                Attributes Attrs = sr.getAttributes();
	                if (Attrs != null) {
	                    //循环记录中的所有字段
	                    for (NamingEnumeration ne = Attrs.getAll(); ne.hasMore(); ) {
	                        //获取字段对象
	                        Attribute Attr = (Attribute) ne.next();
	                        //获取字段名
	                        String AttributeID = Attr.getID().toString();
	                        if (i == 0) {
	                            if (AttributeID.equals("ou")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                	department.setDID(e.next().toString());
	                                    ou = department.getDID();
	                                }
	                            }
	                            if (AttributeID.equals("name")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                	department.setDepartmentName(e.next().toString());
	                                }
	                            }
	                            if (AttributeID.equals("level")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                	department.setLevel(Long.parseLong(e.next().toString()));
	                                }
	                            }
	                            if (AttributeID.equals("description")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                	department.setDescription(e.next().toString());
	                                }
	                            }
	                            //member是人员组织关联字段  获取所有关联人员加到sduList中备用

	                            if (AttributeID.equals("member")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                    String[] str = e.next().toString().split(",");
	                                    String[] str1 = str[0].split("=");
	                                    DUser duser = new DUser();
	                                    duser.setDID(ou);
	                                    duser.setUID(str1[1]);
	                                    dUserList.add(duser);
	                                }
	                            }
	                        }
	                        //设置部门上下级关系
	                        if (i == 1 && AttributeID.equals("ibm-memberGroup")) {
	                            for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
//	                                ou=领导,ou=0269963A,ou=02699A,ou=02,cn=QS,dc=cnnp,dc=com
	                                String[] str = e.next().toString().split(",");
	                                String[] str1 = str[0].split("=");
	                                String[] str2 = str[1].split("=");
	                                if (!str1[1].equals("领导")) {
	                                	 Department department1 = new Department();
	                                	for(int j=0;j<departmentList.size();j++){
	                                		if(departmentList.get(j).getDID().equals(str1[1])){
	                                			departmentList.get(j).setParentID(str2[1]);
	                                			department1=departmentList.get(j);
	                                		}
	                                	}
	                                   
//	                                    if (department1!=null) {
//	                                        department1.setParentID(str2[1]);
//	                                        if(department1.getLevel()!=2){
//	                                        	
//	                                           // departmentDao.save(department1);
//	                                        }
//	                                    }
	                                }
	                            }
	                        }
	                    }
	                    if ((i == 0 && !department.getDID().equals("BusinessDocumentAdmin")) && (!department.getDID().equals("领导")) &&
	                            !department.getDID().substring(0,1).equalsIgnoreCase("G") && !department.getDID().substring(0,1).equalsIgnoreCase("D")
	                            && !department.getDID().substring(0,1).equalsIgnoreCase("T") && !(department.getDID().length()==4) && department.getDepartmentName().indexOf("(原)")==-1) {
	                    	departmentList.add(department);
	                        //如果部门level等于1或2，直接新建一个领导部门，将人员关系关联到该部门下
	                        if(department.getLevel()==1 || department.getLevel()==2){
	                            Department lingdao = new Department();
	                            lingdao.setDID(department.getDID()+"A");
	                            lingdao.setParentID(department.getDID());
	                            if(department.getLevel()==1){
	                                //lingdao.setDepartmentName("公司领导");
	                                //lingdao.setDescription("公司领导");
	                               // lingdao.setLevel(2L);
	                               // departmentDao.save(lingdao);
	                            }else if(department.getLevel()==2){
	                                //当时处级部门时，更新上级部门id为02
	                                department.setParentID("07");
	                               // departmentDao.save(department);

	                                //设置处领导部门
	                               // lingdao.setDepartmentName("处领导");
	                               // lingdao.setDescription("处领导");
	                               // lingdao.setLevel(3L);
	                               // departmentDao.save(lingdao);
	                            }
	                            //当时公司部门或是处部门时，将下面关联的人员关联到领导部门中。
//	                            for (DUser duser : dUserList){
//	                            	duser.setDID(lingdao.getDID());
//	                            	DUser du=dUserDao.findByUIDAndDID(duser.getUID(),duser.getDID());
//	                            	if(du==null){
//	                            		dUserDao.save(duser);
//	                            	}
//	                            }
	                        }else {
//	                        	for (DUser duser : dUserList){
//	                            	DUser du=dUserDao.findByUIDAndDID(duser.getUID(),duser.getDID());
//	                            	if(du==null){
//	                            		dUserDao.save(duser);
//	                            	}
//	                            }
	                        }
	                    }
	                }
	            }
	            System.out.println("Number: " + dUserList.size());
	            System.out.println("Number: " + departmentList.size());
	            ldapQuery.close();
	        } catch (NamingException e) {
	           // LOG.info("Throw Exception :  " + e);
	        }
	        return departmentList;
	    }
	

	 
	 /**
	  * 组织机构关系
	  */
	 
	 public  List<Department> getDeptInfo(int i){
	        String searchFilter = "(&(ou=*)(isValid=true)(isCNNP=true))";
	        String searchBase = "ou=07,cn=HN,DC=CNNP,DC=COM";
	        int totalResults = 0;
	        String[] returnedAtts = {"ou", "cn", "level", "name", "description", "ibm-memberGroup", "member"}; // 定制返回属性
	        LdapQuery ldapQuery = new LdapQuery();
	        ldapQuery.setSearchFilter(searchFilter);
	        ldapQuery.setSearchBase(searchBase);
	        ldapQuery.setReturnedAtts(returnedAtts);
	        List<DUser> dUserList = new ArrayList<DUser>();
	        List<Department> departmentList = new ArrayList<Department>();
	        try {
	            NamingEnumeration answer = ldapQuery.GetADInfo();
	            while (answer.hasMoreElements()) {
	            	//dUserList.clear();
	                SearchResult sr = (SearchResult) answer.next();
	                Department department = new Department();
	                String ou = "";
	                //获取一条记录
	                Attributes Attrs = sr.getAttributes();
	                if (Attrs != null) {
	                    //循环记录中的所有字段
	                    for (NamingEnumeration ne = Attrs.getAll(); ne.hasMore(); ) {
	                        //获取字段对象
	                        Attribute Attr = (Attribute) ne.next();
	                        //获取字段名
	                        String AttributeID = Attr.getID().toString();
	                        if (i == 0) {
	                            if (AttributeID.equals("ou")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                	department.setDID(e.next().toString());
	                                    ou = department.getDID();
	                                }
	                            }
	                            if (AttributeID.equals("name")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                	department.setDepartmentName(e.next().toString());
	                                }
	                            }
	                            if (AttributeID.equals("level")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                	department.setLevel(Long.parseLong(e.next().toString()));
	                                }
	                            }
	                            if (AttributeID.equals("description")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                	department.setDescription(e.next().toString());
	                                }
	                            }
	                            //member是人员组织关联字段  获取所有关联人员加到sduList中备用

	                            if (AttributeID.equals("member")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                    String[] str = e.next().toString().split(",");
	                                    String[] str1 = str[0].split("=");
	                                    DUser duser = new DUser();
	                                    duser.setDID(ou);
	                                    duser.setUID(str1[1]);
	                                    dUserList.add(duser);
	                                }
	                            }
	                        }
	                        //设置部门上下级关系
	                        if (i == 1 && AttributeID.equals("ibm-memberGroup")) {
	                            for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
//	                                ou=领导,ou=0269963A,ou=02699A,ou=02,cn=QS,dc=cnnp,dc=com
	                                String[] str = e.next().toString().split(",");
	                                String[] str1 = str[0].split("=");
	                                String[] str2 = str[1].split("=");
	                                if (!str1[1].equals("领导")) {
	                                	 Department department1 = new Department();
	                                	for(int j=0;j<departmentList.size();j++){
	                                		if(departmentList.get(j).getDID().equals(str1[1])){
	                                			department1=departmentList.get(j);
	                                		}
	                                	}
	                                   
	                                    if (department1!=null) {
	                                        department1.setParentID(str2[1]);
	                                        if(department1.getLevel()!=2){
	                                           // departmentDao.save(department1);
	                                        }
	                                    }
	                                }
	                            }
	                        }
	                    }
	                    if ((i == 0 && !department.getDID().equals("BusinessDocumentAdmin")) && (!department.getDID().equals("领导")) &&
	                            !department.getDID().substring(0,1).equalsIgnoreCase("G") && !department.getDID().substring(0,1).equalsIgnoreCase("D")
	                            && !department.getDID().substring(0,1).equalsIgnoreCase("T") && !(department.getDID().length()==4) && department.getDepartmentName().indexOf("(原)")==-1) {
	                    	departmentList.add(department);
	                        //如果部门level等于1或2，直接新建一个领导部门，将人员关系关联到该部门下
	                        if(department.getLevel()==1 || department.getLevel()==2){
	                            Department lingdao = new Department();
	                            lingdao.setDID(department.getDID()+"A");
	                            lingdao.setParentID(department.getDID());
	                            if(department.getLevel()==1){
	                                //lingdao.setDepartmentName("公司领导");
	                                //lingdao.setDescription("公司领导");
	                               // lingdao.setLevel(2L);
	                               // departmentDao.save(lingdao);
	                            }else if(department.getLevel()==2){
	                                //当时处级部门时，更新上级部门id为02
	                                department.setParentID("07");
	                               // departmentDao.save(department);

	                                //设置处领导部门
	                               // lingdao.setDepartmentName("处领导");
	                               // lingdao.setDescription("处领导");
	                               // lingdao.setLevel(3L);
	                               // departmentDao.save(lingdao);
	                            }
	                            //当时公司部门或是处部门时，将下面关联的人员关联到领导部门中。
//	                            for (DUser duser : dUserList){
//	                            	duser.setDID(lingdao.getDID());
//	                            	DUser du=dUserDao.findByUIDAndDID(duser.getUID(),duser.getDID());
//	                            	if(du==null){
//	                            		dUserDao.save(duser);
//	                            	}
//	                            }
	                        }else {
//	                        	for (DUser duser : dUserList){
//	                            	DUser du=dUserDao.findByUIDAndDID(duser.getUID(),duser.getDID());
//	                            	if(du==null){
//	                            		dUserDao.save(duser);
//	                            	}
//	                            }
	                        }
	                    }
	                }
	            }
	            System.out.println("Number: " + dUserList.size());
	            System.out.println("Number: " + departmentList.size());
	            ldapQuery.close();
	        } catch (NamingException e) {
	           // LOG.info("Throw Exception :  " + e);
	        }
	        return departmentList;
	    }
	
	 public  List<DUser> getDeptInfoa(int i){
	        String searchFilter = "(&(ou=*)(isValid=true)(isCNNP=true))";
	        String searchBase = "ou=07,cn=HN,DC=CNNP,DC=COM";
	        int totalResults = 0;
	        String[] returnedAtts = {"ou", "cn", "level", "name", "description", "ibm-memberGroup", "member"}; // 定制返回属性
	        LdapQuery ldapQuery = new LdapQuery();
	        ldapQuery.setSearchFilter(searchFilter);
	        ldapQuery.setSearchBase(searchBase);
	        ldapQuery.setReturnedAtts(returnedAtts);
	        List<DUser> dUserList = new ArrayList<DUser>();
	        List<Department> departmentList = new ArrayList<Department>();
	        try {
	            NamingEnumeration answer = ldapQuery.GetADInfo();
	            while (answer.hasMoreElements()) {
	            	//dUserList.clear();
	                SearchResult sr = (SearchResult) answer.next();
	                Department department = new Department();
	                String ou = "";
	                //获取一条记录
	                Attributes Attrs = sr.getAttributes();
	                if (Attrs != null) {
	                    //循环记录中的所有字段
	                    for (NamingEnumeration ne = Attrs.getAll(); ne.hasMore(); ) {
	                        //获取字段对象
	                        Attribute Attr = (Attribute) ne.next();
	                        //获取字段名
	                        String AttributeID = Attr.getID().toString();
	                        if (i == 0) {
	                            if (AttributeID.equals("ou")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                	department.setDID(e.next().toString());
	                                    ou = department.getDID();
	                                }
	                            }
	                            if (AttributeID.equals("name")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                	department.setDepartmentName(e.next().toString());
	                                }
	                            }
	                            if (AttributeID.equals("level")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                	department.setLevel(Long.parseLong(e.next().toString()));
	                                }
	                            }
	                            if (AttributeID.equals("description")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                	department.setDescription(e.next().toString());
	                                }
	                            }
	                            //member是人员组织关联字段  获取所有关联人员加到sduList中备用

	                            if (AttributeID.equals("member")) {
	                                for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
	                                    String[] str = e.next().toString().split(",");
	                                    String[] str1 = str[0].split("=");
	                                    DUser duser = new DUser();
	                                    duser.setDID(ou);
	                                    duser.setUID(str1[1]);
	                                    dUserList.add(duser);
	                                }
	                            }
	                        }
	                        //设置部门上下级关系
	                        if (i == 1 && AttributeID.equals("ibm-memberGroup")) {
	                            for (NamingEnumeration e = Attr.getAll(); e.hasMore(); totalResults++) {
//	                                ou=领导,ou=0269963A,ou=02699A,ou=02,cn=QS,dc=cnnp,dc=com
	                                String[] str = e.next().toString().split(",");
	                                String[] str1 = str[0].split("=");
	                                String[] str2 = str[1].split("=");
	                                if (!str1[1].equals("领导")) {
	                                	 Department department1 = new Department();
	                                	for(int j=0;j<departmentList.size();j++){
	                                		if(departmentList.get(j).getDID().equals(str1[1])){
	                                			department1=departmentList.get(j);
	                                		}
	                                	}
	                                   
	                                    if (department1!=null) {
	                                        department1.setParentID(str2[1]);
	                                        if(department1.getLevel()!=2){
	                                           // departmentDao.save(department1);
	                                        }
	                                    }
	                                }
	                            }
	                        }
	                    }
	                    if ((i == 0 && !department.getDID().equals("BusinessDocumentAdmin")) && (!department.getDID().equals("领导")) &&
	                            !department.getDID().substring(0,1).equalsIgnoreCase("G") && !department.getDID().substring(0,1).equalsIgnoreCase("D")
	                            && !department.getDID().substring(0,1).equalsIgnoreCase("T") && !(department.getDID().length()==4) && department.getDepartmentName().indexOf("(原)")==-1) {
	                    	departmentList.add(department);
	                        //如果部门level等于1或2，直接新建一个领导部门，将人员关系关联到该部门下
	                        if(department.getLevel()==1 || department.getLevel()==2){
	                            Department lingdao = new Department();
	                            lingdao.setDID(department.getDID()+"A");
	                            lingdao.setParentID(department.getDID());
	                            if(department.getLevel()==1){
	                                //lingdao.setDepartmentName("公司领导");
	                                //lingdao.setDescription("公司领导");
	                               // lingdao.setLevel(2L);
	                               // departmentDao.save(lingdao);
	                            }else if(department.getLevel()==2){
	                                //当时处级部门时，更新上级部门id为02
	                                department.setParentID("07");
	                               // departmentDao.save(department);

	                                //设置处领导部门
	                               // lingdao.setDepartmentName("处领导");
	                               // lingdao.setDescription("处领导");
	                               // lingdao.setLevel(3L);
	                               // departmentDao.save(lingdao);
	                            }
	                            //当时公司部门或是处部门时，将下面关联的人员关联到领导部门中。
//	                            for (DUser duser : dUserList){
//	                            	duser.setDID(lingdao.getDID());
//	                            	DUser du=dUserDao.findByUIDAndDID(duser.getUID(),duser.getDID());
//	                            	if(du==null){
//	                            		dUserDao.save(duser);
//	                            	}
//	                            }
	                        }else {
//	                        	for (DUser duser : dUserList){
//	                            	DUser du=dUserDao.findByUIDAndDID(duser.getUID(),duser.getDID());
//	                            	if(du==null){
//	                            		dUserDao.save(duser);
//	                            	}
//	                            }
	                        }
	                    }
	                }
	            }
	            System.out.println("Number: " + dUserList.size());
	            System.out.println("Number: " + departmentList.size());
	            ldapQuery.close();
	        } catch (NamingException e) {
	           // LOG.info("Throw Exception :  " + e);
	        }
	        return dUserList;
	    }
	
	  public List<Usera> getUserInfo() {
	    	
	    	String md5Pass = "password";
	        String searchFilter = "(&(uid=*)(isSystem=false)(isValid=true)(isCNNP=true))";
	        String searchBase = "cn=users,cn=HN,DC=CNNP,DC=COM";
	        int totalResults = 0;
	        String[] returnedAtts = {"uid", "birthday", "degree", "displayName", "gender", "mail", "title","isSystem","userpassword"}; // 定制返回属性
	        LdapQuery ldapQuery = new LdapQuery();
	        ldapQuery.setSearchFilter(searchFilter);
	        ldapQuery.setSearchBase(searchBase);
	        ldapQuery.setReturnedAtts(returnedAtts);
	        List<Usera> list=new ArrayList<Usera>();
	        try {
	            NamingEnumeration answer = ldapQuery.GetADInfo();
	            while (answer.hasMoreElements()) {
	                SearchResult sr = (SearchResult) answer.next();
	                Attributes Attrs = sr.getAttributes();
	                if (Attrs != null) {
	                    Usera user = new Usera();
	                    for (NamingEnumeration ne = Attrs.getAll(); ne.hasMore(); ) {
	                        Attribute Attr = (Attribute) ne.next();
	                        // 读取属性值
	                        for (NamingEnumeration e = Attr.getAll(); e
	                                .hasMore(); totalResults++) {
	                            String a = e.next().toString();
	                            if (Attr.getID().toString().equals("uid")) {
	                            	user.setUid(a);
	                            } else if (Attr.getID().toString().equals("birthday")) {
	                            	user.setBirthday(a);
	                            } else if (Attr.getID().toString().equals("degree")) {
	                            	user.setDegree(a);
	                            } else if (Attr.getID().toString().equals("displayName")) {
	                            	user.setUserName(a);
	                            } else if (Attr.getID().toString().equals("gender")) {
	                            	user.setGender(a);
	                            } else if (Attr.getID().toString().equals("mail")) {
	                            	user.setEmail(a);
	                            } else if (Attr.getID().toString().equals("title")) {
	                                //domain.setJob_position(a);
	                            } else if (Attr.getID().toString().equals("userpassword")){
	                            	user.setPassword(a);
	                            }
	                        }
	                    }
//	                    System.out.println(domain.getViewname()+"   "+domain.getJob_num());

//	                    if ((user.getUid() != null && !user.getUid().equals("") && (isNumeric(user.getUid())) ||(user.getUid().indexOf("gk_")>-1))) {
//	                        User newUser =userDao.findByUid(user.getUid());
//	                        
//	                        if (newUser==null) {
//	                        	 user.setPassword(md5Pass);
//	                             userDao.save(user);
//	                             URole uRole = uRoleDao.findByRidAndUid(role.getRid(),user.getUid());
//	                             if(uRole==null){
//	                            	uRole = new URole(); 
//	                            	uRole.setRid("0001");
//	                                uRole.setUid(user.getUid());
//	                                uRoleDao.save(uRole);
//	                             }
//	                        }
//	                    }
	                    list.add(user);
	                }
	               
	                
	            }
	            System.out.println("Number: " + totalResults);
	            ldapQuery.close();
	        } catch (NamingException e) {
//	            e.printStackTrace();
	           
	        }
	        return list;
	    }
	 
	  
	  public static void main(String[] args) throws Exception {
			//test2 a=new test2();
			//a.getUser();
		}
}
