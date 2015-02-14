package index

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/martini-contrib/render"
	
	"ftjx/services"
)

func Index(db *mgo.Database, r render.Render) {

	ctx := bson.M{}
	
	//友情链接
	ctx["Links"], _ = services.LinkList(db)
	
	r.HTML(200, "index", ctx, render.HTMLOptions{
		Layout: "index-layout", 
	});
}