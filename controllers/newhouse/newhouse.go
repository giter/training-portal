package newhouse

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/martini-contrib/render"
	
	"ftjx/services"
	"ftjx/forms"
)

func Letters() []string {

	letters := "abcdefghijklmnopqrstuvwxyz"
	m := make([]string, 0, 30)
	for i:=0;i<len(letters);i=i+1 {
		m = append(m, letters[i:i+1]);
	}
	return m
}

//新房首页
func Index(db *mgo.Database, ctx bson.M, r render.Render) {
	
	var err error
	
	//友情链接
	if ctx["Links"], err = services.LinkList(db); err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseDeliveries"], err = services.RealEstateDeliveries(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseOpens"], err = services.RealEstateOpens(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseFocus"], err = services.RealEstateFocus(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseRecommends"], err = services.RealEstateRecommends(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	ctx["Letters"] = Letters()
	
	r.HTML(200, "newhouse-index", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}

//楼盘大全
func List(db *mgo.Database, ctx bson.M, r render.Render, query forms.RealEstatePageForm) {
	
	var err error
	
	//友情链接
	if ctx["Links"], err = services.LinkList(db); err!= nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseDeliveries"], err = services.RealEstateDeliveries(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseOpens"], err = services.RealEstateOpens(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseFocus"], err = services.RealEstateFocus(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseRecommends"], err = services.RealEstateRecommends(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhousePage"], err = services.RealEstatePage(db, query); err!=nil{
		r.Error(500);
		return
	}
	
	ctx["Letters"] = Letters()
	
	r.HTML(200, "newhouse-list", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}