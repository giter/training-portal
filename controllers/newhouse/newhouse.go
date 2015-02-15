package newhouse

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/martini-contrib/render"
	
	"ftjx/services"
)

//新房首页
func Index(db *mgo.Database, r render.Render) {

	ctx := bson.M{}
	
	//友情链接
	ctx["Links"], _ = services.LinkList(db)
	
	r.HTML(200, "newhouse-index", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}

//楼盘大全
func List(db *mgo.Database, r render.Render) {

	ctx := bson.M{}
	
	//友情链接
	ctx["Links"], _ = services.LinkList(db)
	
	r.HTML(200, "newhouse-list", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}