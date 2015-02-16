package groupbuy

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/martini-contrib/render"
)

//团购页
func Index(db *mgo.Database, ctx bson.M, r render.Render) {

	r.HTML(200, "groupbuy-index", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}