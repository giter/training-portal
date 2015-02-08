package models

import (
	"crypto/sha1"
	"encoding/hex"
	"io"
	"time"
)

const SALT = "Jxft"

const (
	COLLECTION_AREA = "Area"
	COLLECTION_CATEGORY = "Category"
	COLLECTION_LINK = "Link"
	COLLECTION_NEWS = "News"
	COLLECTION_REAL_ESTATE = "RealEstate"
	COLLECTION_REAL_ESTATE_COMPANY = "RealEstateCompany"
	COLLECTION_MANAGER = "Manager"
)

type MTime struct {
	
	// 创建时间
	Created *int64 `bson:"Created,omitempty"`
	
	// 更新时间
	Changed *int64 `bson:"Changed,omitempty"`
}


type Category struct {

	Id *string `bson:"_id,omitempty"`
	
	Name *string `bson:"Name,omitempty"`
	Code *string `bson:"Code,omitempty"`
	Weight *int64 `bson:"Weight,omitempty"`
	
	MTime *MTime `bson:"MTime,omitempty"`
}

type Stats struct {
	
	// 点击量
	Clicked *int64 `bson:"Clicked,omitempty"`
	
	// 评论数
	Comments *int64 `bson:"Comments,omitempty"`
	
	// 好评数
	Goods *int64 `bson:"Goods,omitempty"`
	
	// 差评数
	Bads *int64 `bson:"Bads,omitempty"`
	
	// 团购数
	Groupon *int64 `bson:"Groupon,omitempty"`
}

// 友情链接
type Link struct {

	Id *string `bson:"_id,omitempty"`

	// 基础属性
	
	Name   *string `bson:"Name,omitempty"`
	Type   *string `bson:"Type,omitempty"`
	Link   *string `bson:"Link,omitempty"`
	Weight *int64 `bson:"Weight,omitempty"`
	State  bool   `bson:"State,omitempty"`
	
	// 联系人
	Contact *string `bson:"Contact,omitempty"`
	Phone   *string `bson:"Phone,omitempty"`
	
	// 扩展属性
	NoFollow bool `bson:"Nofollow,omitempty"`
	PR *int	`bson:"Pr,omitempty"`
	
	// 统计属性
	MTime *MTime      `bson:"MTime,omitempty"`
	Stats *Stats      `bson:"Stats,omitempty"`
	Manager *Manager     `bson:"User,omitempty"`
}

// 用户
type User struct {

	Id	*string `bson:"_id,omitempty"`
	
	//基础属性
	Type *int `bson:"Type,omitempty"` 
	Name *string `bson:"Name,omitempty"`
	Account *string `bson:"Account,omitempty"`
	Password *string `bson:"Password,omitempty"`
	
	// 扩展属性
	MTime *MTime      `bson:"MTime,omitempty"`
}

type Location struct {

	Lat *string `bson:"Lat,omitempty"`
	Lng *string `bson:"Lng,omitempty"`
}

type Manager struct {

	Id	*string `bson:"_id,omitempty"`
	
	Name *string `bson:"Name,omitempty"`
	Account *string `bson:"Account,omitempty"`
	Password *string `bson:"Password,omitempty"`
	
	MTime *MTime      `bson:"MTime,omitempty"`
}

type Area struct {
	
	Id *string `bson:"_id,omitempty"`
	
	City *string `bson:"City,omitempty"`
	Area *string `bson:"Area,omitempty"`
	Weight *int64 `bson:"Weight,omitempty"`
	
	Zones []string `bson:"Zones,omitempty"`
	
	MTime *MTime `bson:"MTime,omitempty"`
}

type Company struct {

	Id *string `bson:"_id,omitempty"`
	
	Area *Area    `bson:"Area,omitempty"`
	
	//公司简称
	Name *string `bson:"Name,omitempty"`
	
	//公司全称
	Title *string `bson:"Title,omitempty"`
	
	//公司法人
	Legal *string `bson:"Legal,omitempty"`
	
	//公司联系人
	Linkman *string `bson:"Linkman,omitempty"`
	
	//联系电话
	Phone   *string `bson:"Phone,omitempty"`
	
	//传真
	Fax     *string `bsn:"Fax,omitempty"`
	
	//公司地址
	Address *string `bson:"Address,omitempty"`
	
	//公司主页
	Homepage *string `bson:"Homepage,omitempty"`
	
	//公司简介
	Description *string `bson:"Description,omitempty"`
	
	//排序
	Weight *int64 `bson:"Weight,omitempty"`
	
	//更新时间
	MTime *MTime `bson:"MTime,omitempty"`
}

type RealEstateCompany Company;
type RealEstateConduitCompany Company;
type PropertyManagementCompany Company;

type School struct {

	_id *string `bson:"_id,omitempty"`
	Type *string `bson:"Type,omitempty"`
	
	Area *Area    `bson:"Area,omitempty"`
	Name *string `bson:"Name,omitempty"`
}

type JuniorSchool School;
type MiddleSchool School;

type Enviroment struct {
	
	//位置
	Road  *string `bson:"Road,omitempty"`
	
	//交通
	Traffic *string `bson:"Traffic,omitempty"`
	BusLine *string `bson:"BusLine,omitempty"`
	FlyOver *string `bson:"FlyOver,omitempty"`
	HighWay *string `bson:"Highway,omitempty"`
	Railway *string `bson:"Railway,omitempty"`
	Bus     *string `bson:"Bus,omitempty"`
	AirPort *string `bson:"AirPort,omitempty"`
	
	//车位
	Carbarn *string `bson:"Carbarn,omitempty"`
	CPrice *string `bson:"CPrice,omitempty"`
	CRent *string `bson:"CRent,omitempty"`
	
}

type RealEstate struct {
	
	Id *string `bson:"_id,omitempty"`
	
	//楼盘状态 <通过，待审>
	State *int `bson:"State,omitempty"`
	
	//楼盘名称
	Name *string `bson:"Name,omitempty"`
	//楼盘别名
	ByName *string `bson:"Byname,omitempty"`
	//楼盘位置
	Location *Location `bson:"Location,omitempty"`
	//销售状态
	Schedule *int `bson:"Schedule,omitempty"`
	
	//楼盘区域
	Area *Area   `bson:"Area,omitempty"`
	
	//首字母
	Captain   *string `bson:"Captain,omitempty"`
	
	//楼盘地址
	Address   *string `bson:"Address,omitempty"`
	
	//小学
	Junior    *JuniorSchool `bson:"Junior,omitempty"`
	//初中
	Middle    *MiddleSchool `bson:"Middle,omitempty"`
	
	//房产公司
	Estate *RealEstateCompany `bson:"Estate,omitempty"`
	//发展商
	Developer *string `bson:"Developer,omitempty"`
	//销售代理
	Agency    *string `bson:"Agency,omitempty"`
	//策划公司
	Machinate *string `bson:"Machinate,omitempty"`
	//物业公司
	Property  *string `bson:"Property,omitempty"`
	
	//售楼电话
	Phone       []string `bson:"Phone,omitempty"`
	//售楼地址
	SellAddress []string `bson:"Selladdress,omitempty"`
	
	//400电话配置
	Order  *string `bson:"Order,omitempty"`
	PropertyFee *string `bson:"PropertyFee,omitempty"`
	
	//周边配套
	Env Enviroment `bson:"Enviroment,omitempty"`
	
	Remark *string `bson:"Remark,omitempty"`
	Adword *string `bson:"Adword,omitempty"`
	
	//房屋结构
	Structure []string `bson:"Structure,omitempty"`
	Content *string `bson:"Content,omitempty"`
	
	// 扩展属性
	MTime *MTime      `bson:"MTime,omitempty"`
	Stats Stats      `bson:"Stats,omitempty"`
	Manager *Manager   `bson:"Manager,omitempty"`
}

type News struct {

	Id *string `bson:"_id,omitempty"`
	
	// 资讯所属
	City *string `bson:"City,omitempty"`
	
	// 资讯来源
	Source *int `bson:"Source,omitempty"`
	
	// 发布时间
	Time   *int64 `bson:"Time,omitempty"` 
	
	// 资讯正标题
	Title  *string `bson:"Title,omitempty"`
	
	// 资讯副标题
	Subtitle *string `bson:"Subtitle,omitempty"`
	
	// 短标题
	Slug *string `bson:"Slug,omitempty"`
	
	// WAP标题
	WAPTitle *string `bson:"WAPTitle,omitempty"`

	// 资讯类别
	Category []Category `bson:"Category,omitempty"`
	
	// 资讯标签
	Tag []string `bson:"Tag,omitempty"`
	
	// URL
	URL *string `bson:"URL,omitempty"`
	
	// SEO关键词
	SEOKeyword *string `bson:"SEOKeyword,omitempty"`
	
	// SEO描述
	SEODescription *string `bson:"SEODescription,omitempty"`
	
	// 资讯摘要
	Brief *string `bson:"Brief,omitempty"`
	
	// 资讯正文
	Content *string `bson:"Content,omitempty"`
	
	MTime *MTime `bson:"MTime,omitempty"`
	Stats *Stats `bson:"Stats,omitempty"`
}

func (n *News) STime() string{

	if n.Time == nil {
		return ""
	}
		
	return time.Unix(*n.Time, 0).Format(time.ANSIC)
}

type Comment struct {
	
	Id *string `bson:"_id,omitempty"`
	
	Type *string `bson:"Type,omitempty"`
	
	Comment *string `bson:"Comment,omitempty"`
	Reply   *string `bson:"Reply,omitempty"`
	
	User User `bson:"User,omitempty"`
}

type Billboard struct {

	Id *string `bson:"_id,omitempty"`
	
	//方告位名称
	Name *string `bson:"Name,omitempty"`
	
	//查询标签
	Tag []string `bson:"Tag,omitempty"`
	
	//广告位代码
	Code *string `bson:"Code,omitempty"`
	
	//广告类型限制
	Type   *int `bson:"Type,omitempty"`
	
	//广告数限制
	Limit  *int `bson:"Limit,omitempty"`

}

type Advertisment struct {
	
	Id *string `bson:"_id,omitempty"`

	//广告位
	Billboard *Billboard `bson:"Billboard,omitempty"`
	
	//广告性质 1. 商业广告 2. 非商业广告 3.赠送广告 
	Nature *int `bson:"Nature,omitempty"`
	
	//合同编号
	Contract *string `bson:"Contract,omitempty"`
	
	//广告资源 (图片、Flash广告)
	Resource *string `bson:"Resource,omitempty"`
	Height *int `bson:"Height,omitempty"`
	Width *int `bson:"Width,omitempty"`
	Link  *string `bson:"Link,omitempty"`

	//广告标题(文字广告)
	Title *string `bson:"Name,omitempty"`
	//广告颜色(文字广告)
	Color *string `bson:"Color,omitempty"`
	
	//投放类型 0. 连续投放 1. 非连续投放
	Play *int `bson:"Play,omitempty"`
	
	//投放开始时间
	Begin *int64 `bson:"Begin,omitempty"`;
	//投放结束时间
	End   *int64 `bson:"End,omitempty"`;
	//非连续投放或生成数据
	Days []int64 `bson:"Days,omitempty"`
	
	//备注
	Remark *string `bson:"Remark,omitempty"`
}

func EncodePassword(pass string) string {

	mc := sha1.New()
	io.WriteString(mc, SALT)
	io.WriteString(mc, pass)
	return hex.EncodeToString(mc.Sum(nil))
}

func NewString(s string) (e *string) {
	
	e = new(string)
	*e = s
	return
}

func NewInt64(s int64) (e *int64) {

	e = new(int64)
	*e = s
	return 
}
