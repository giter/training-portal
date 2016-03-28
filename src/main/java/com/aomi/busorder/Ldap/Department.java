package com.aomi.busorder.Ldap;


public class Department {
	private String DID;//同步ldap使用
	private String parentID;//部门父节点 0表示根节点  父节点为did
	private Long level;//几级部门
	private String departmentName;
	private String description;
	private Integer soryBy;//排序
	
	public String getDID() {
		return DID;
	}
	public void setDID(String dID) {
		DID = dID;
	}
	
	public String getParentID() {
		return parentID;
	}
	public void setParentID(String parentID) {
		this.parentID = parentID;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getSoryBy() {
		return soryBy;
	}
	public void setSoryBy(Integer soryBy) {
		this.soryBy = soryBy;
	}
	public Long getLevel() {
		return level;
	}
	public void setLevel(Long level) {
		this.level = level;
	}

}
