package index

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/martini-contrib/render"
	
	"ftjx/services"
)

func Index(db *mgo.Database, ctx bson.M, r render.Render) {

	//友情链接
	ctx["Links"], _ = services.LinkList(db)
	ctx["Areas"], _ = services.AreaList(db)
	ctx["Tops"]  = services.Tops()
	ctx["Query"] = bson.M{}
	
	r.HTML(200, "index", ctx, render.HTMLOptions{
		Layout: "index-layout", 
	});
}