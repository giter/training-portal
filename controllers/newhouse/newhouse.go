package newhouse

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/martini-contrib/render"
	
	"ftjx/services"
)

//新房首页
func Index(db *mgo.Database, ctx bson.M, r render.Render) {
	
	var err error
	
	//友情链接
	if ctx["Links"], err = services.LinkList(db); err != nil {
		r.Error(500);
		return
	}
	
	if ctx["Deliveries"], err = services.RealEstateDeliveries(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["Opens"], err = services.RealEstateOpens(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	r.HTML(200, "newhouse-index", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}

//楼盘大全
func List(db *mgo.Database, ctx bson.M, r render.Render) {
	
	var err error
	
	//友情链接
	if ctx["Links"], err = services.LinkList(db); err!= nil {
		r.Error(500);
		return
	}
	
	if ctx["Deliveries"], err = services.RealEstateDeliveries(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["Opens"], err = services.RealEstateOpens(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["Page"], err = services.RealEstatePage(db); err!=nil{
		r.Error(500);
		return
	}
	r.HTML(200, "newhouse-list", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}