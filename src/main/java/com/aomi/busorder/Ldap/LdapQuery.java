package com.aomi.busorder.Ldap;

import java.util.Hashtable;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.SearchControls;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;

/**
 * Created with IntelliJ IDEA. User: jgh Date: 14-6-17 Time: 上午11:04 To change
 * this template use File | Settings | File Templates.
 */
public class LdapQuery {

  private LdapContext ctx;
  private String searchFilter;
  private String searchBase;
  private String LDAP_URL = "ldap://10.16.16.42:389";
  private String adminName = "cn=root";
  private String adminPassword = "Passw0rd";
  private String returnedAtts[];

  @SuppressWarnings({ "rawtypes", "unchecked" })
  public NamingEnumeration GetADInfo() throws NamingException {
    Hashtable HashEnv = new Hashtable();
    // String LDAP_URL = "ldap://10.16.16.42:389"; // LDAP访问地址
    // 访问端口为398，不同的LDAP服务器有所不同
    // String adminName = "cn=root"; //注意用户名的写法：domain\User 或
    // String adminPassword = "Passw0rd"; // 密码
    HashEnv.put(Context.SECURITY_AUTHENTICATION, "simple"); // LDAP访问安全级别
    HashEnv.put(Context.SECURITY_PRINCIPAL, adminName); // AD User
    HashEnv.put(Context.SECURITY_CREDENTIALS, adminPassword); // AD
    HashEnv.put(Context.INITIAL_CONTEXT_FACTORY,
        "com.sun.jndi.ldap.LdapCtxFactory"); // LDAP工厂类
    HashEnv.put(Context.PROVIDER_URL, LDAP_URL);

    ctx = new InitialLdapContext(HashEnv, null);
    SearchControls searchCtls = new SearchControls(); // Create the
    searchCtls.setSearchScope(SearchControls.SUBTREE_SCOPE); // Specify
    // String searchFilter = "(ou=*)";
    // String searchBase = "ou=02,cn=QS,DC=CNNP,DC=COM";
    // String returnedAtts[] = {"ou", "cn", "level", "name", "description",
    // "ibm-memberGroup", "member"}; // 定制返回属性
    searchCtls.setReturningAttributes(returnedAtts); // 设置返回属性集
    NamingEnumeration answer = ctx.search(searchBase, searchFilter, searchCtls);
    return answer;
  }

  public void close() throws NamingException {
    ctx.close();
  }

  public LdapContext getCtx() {
    return ctx;
  }

  public void setCtx(LdapContext ctx) {
    this.ctx = ctx;
  }

  public String getSearchFilter() {
    return searchFilter;
  }

  public void setSearchFilter(String searchFilter) {
    this.searchFilter = searchFilter;
  }

  public String getSearchBase() {
    return searchBase;
  }

  public void setSearchBase(String searchBase) {
    this.searchBase = searchBase;
  }

  public String getLDAP_URL() {
    return LDAP_URL;
  }

  public void setLDAP_URL(String LDAP_URL) {
    this.LDAP_URL = LDAP_URL;
  }

  public String getAdminName() {
    return adminName;
  }

  public void setAdminName(String adminName) {
    this.adminName = adminName;
  }

  public String getAdminPassword() {
    return adminPassword;
  }

  public void setAdminPassword(String adminPassword) {
    this.adminPassword = adminPassword;
  }

  public String[] getReturnedAtts() {
    return returnedAtts;
  }

  public void setReturnedAtts(String[] returnedAtts) {
    this.returnedAtts = returnedAtts;
  }
}
