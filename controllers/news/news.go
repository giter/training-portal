package news

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/martini-contrib/render"
)

//资讯首页
func Index(db *mgo.Database, ctx bson.M, r render.Render) {

	r.HTML(200, "news-index", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}