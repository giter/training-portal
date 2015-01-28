package models

import (

	"crypto/sha1"
	"encoding/hex"
	"io"
)

const salt = "jxft"

const COLLECTION_AREA = "area";
const COLLECTION_LINK = "link";
const COLLECTION_REAL_ESTATE_COMPANY = "rec";

type MTime struct {
	
	// 创建时间
	Created int64 `bson:"created"`
	
	// 更新时间
	Changed int64 `bson:"changed"`
}

type Stats struct {
	
	// 点击量
	Clicked int64 `bson:"clicked"`
	
	// 评论数
	Comments int64 `bson:"comments"`
	
	// 好评数
	Goods int64 `bson:"goods"`
	
	// 差评数
	Bads int64 `bson:"bads"`
	
}

// 友情链接
type Link struct {

	Id string `bson:"_id"`

	// 基础属性
	
	Name   string `bson:"name"`
	Type   string `bson:"type"`
	Link   string `bson:"link"`
	Weight int `bson:"weight"`
	State  bool   `bson:"state"`
	
	// 联系人
	Contact string `bson:"contact"`
	Phone   string `bson:"phone"`
	
	// 扩展属性
	NoFollow bool `bson:"nofollow"`
	PR int	`bson:"pr,omitempty"`
	
	// 统计属性
	MTime MTime      `bson:"mtime"`
	Stats *Stats      `bson:"stats,omitempty"`
	Manager *Manager     `bson:"user,omitempty"`
}

// 用户
type User struct {

	Id	string `bson:"_id"`
	
	//基础属性
	Type int `bson:"type"` 
	Name string `bson:"name"`
	Account string `bson:"account"`
	Password string `bson:"password"`
	
	// 扩展属性
	MTime MTime      `bson:"mtime"`
}

type Location struct {

	lat string `bson:"lat"`
	lng string `bson:"lng"`
}

type Manager struct {

	Id	string `bson:"_id"`
	
	Name string `bson:"name"`
	Account string `bson:"account"`
	Password string `bson:"password"`
	
	MTime MTime      `bson:"mtime"`
}

type Area struct {
	
	Id string `bson:"_id"`
	
	City string `bson:"city"`
	Area string `bson:"area"`
	Weight int64 `bson:"weight"`
	Zones []string `bson:"zones,omitempty"`
	
	// 当前板块
	Zone string `bson:"zone,omitempty"`
	
	MTime MTime `bson:"mtime"`
}

type Company struct {

	Id string `bson:"_id"`
	
	// Type string `bson:"type"`
	
	AR *Area    `bson:"area,omitempty"`
	
	//公司简称
	Name string `bson:"name"`
	
	//公司全称
	Title string `bson:"title"`
	
	//公司法人
	Legal string `bson:"legal"`
	
	//公司联系人
	Linkman string `bson:"linkman"`
	
	//联系电话
	Phone   string `bson:"phone"`
	
	//传真
	Fax     string `bsn:"fax"`
	
	//公司地址
	Address string `bson:"address"`
	
	//公司主页
	Homepage string `bson:"homepage"`
	
	//公司简介
	Description string `bson:"description"`
	
	//排序
	Weight int64 `bson:"weight"`
	
	//更新时间
	MTime MTime `bson:"mtime"`
}

type RealEstateCompany Company;
type RealEstateConduitCompany Company;
type PropertyManagementCompany Company;

type School struct {

	Id string `bson:"_id"`
	Type string `bson:"type"`
	
	AR *Area    `bson:"area,omitempty"`
	Name string `bson:"name,omitempty"`
}

type JuniorSchool School;
type MiddleSchool School;

type Enviroment struct {
	
	//位置
	Road  string `bson:"road,omitempty"`
	
	//交通
	Traffic string `bson:"traffic,omitempty"`
	BusLine string `bson:"busline,omitempty"`
	FlyOver string `bson:"flyover,omitempty"`
	HighWay string `bson:"highway,omitempty"`
	Railway string `bson:"railway,omitempty"`
	Bus     string `bson:"bus,omitempty"`
	AirPort string `bson:"airport,omitempty"`
	
	//车位
	Carbarn string `bson:"carbarn,omitempty"`
	CPrice string `bson:"cprice,omitempty"`
	CRent string `bson:"crent,omitempty"`
	
}

type Estate struct {
	
	Id string `bson:"_id"`
	
	//楼盘状态 <通过，待审>
	State int `bson:"state"`
	
	//楼盘名称
	Name string `bson:"name"`
	//楼盘别名
	ByName string `bson:"byname,omitempty"`
	//楼盘位置
	Location Location `bson:"location,omitempty"`
	//销售状态
	Schedule int `bson:"schedule"`
	
	//楼盘区域
	AR Area   `bson:"area"`
	
	//首字母
	Captain   string `bson:"captain"`
	
	//楼盘地址
	Address   string `bson:"address"`
	
	//小学
	Junior    *JuniorSchool `bson:"junior,omitempty"`
	//初中
	Middle    *MiddleSchool `bson:"middle,omitempty"`
	
	//房产公司
	Estate *RealEstateCompany `bson:"estate,omitempty"`
	//发展商
	Developer string `bson:"developer"`
	//销售代理
	Agency    string `bson:"agency"`
	//策划公司
	Machinate string `bson:"machinate"`
	//物业公司
	Property  string `bson:"property"`
	
	//售楼电话
	Phone       []string `bson:"phone"`
	//售楼地址
	SellAddress []string `bson:"sell"`
	
	//400电话配置
	Order  string `bson:"order"`
	PropertyFee string `bson:"propertyfee"`
	
	//周边配套
	Env Enviroment `bson:"env"`
	
	Remark string `bson:"remark"`
	Adword string `bson:"adword"`
	
	//房屋结构
	Structure []string `bson:"structure"`
	Content string `bson:'content"`
	
	// 扩展属性
	Mtime MTime      `bson:"mtime"`
	Stats Stats      `bson:"stats"`
	Manager *Manager   `bson:"manager"`
}


type Comment struct {
	
	Id string `bson:"_id"`
	
	Type string `bson:"type"`
	
	Comment string `bson:"comment"`
	Reply   string `bson:"reply"`
	
	User User `bson:"user"`
}

type Billboard struct {

	Id string `bson:"_id"`
	
	//方告位名称
	Name string `bson:"name"`
	
	//查询标签
	Tag []string `bson:"tag"`
	
	//广告位代码
	Code string `bson:"code"`
	
	//广告类型限制
	Type   int `bson:"type"`
	
	//广告数限制
	Limit  int `bson:"limit"`

}

type Advertisment struct {
	
	Id string `bson:"_id"`

	//广告位
	Billboard *Billboard `bson:"billboard"`
	
	//广告性质 1. 商业广告 2. 非商业广告 3.赠送广告 
	Nature int `bson:"nature"`
	
	//合同编号
	Contract string `bson:"contract"`
	
	//广告资源 (图片、Flash广告)
	Resource string `bson:"resource"`
	Height int `bson:"height"`
	Width int `bson:"width"`
	Link  string `bson:"link"`

	//广告标题(文字广告)
	Title string `bson:"name"`
	//广告颜色(文字广告)
	Color string `bson:"color"`
	
	//投放类型 0. 连续投放 1. 非连续投放
	Play int `bson:"play"`
	
	//投放开始时间
	Begin int64 `bson:"begin"`;
	//投放结束时间
	End   int64 `bson:"end"`;
	//非连续投放或生成数据
	Days []int64 `bson:"days"`
	
	//备注
	Remark string `bson:"remark"`
}

func EncodePassword(pass string) string {

	mc := sha1.New()
	io.WriteString(mc, salt)
	io.WriteString(mc, pass)
	return hex.EncodeToString(mc.Sum(nil))
}

func NewLink(Type string, Name string ,  Href string) Link{

	return Link {
	
		Type: Type,
		Name: Name,
		Link: Href,
		Weight: 999999,
	};
}