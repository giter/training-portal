package main

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/gzip"
	"github.com/martini-contrib/render"
	"gopkg.in/mgo.v2"
	
	// "ftjx/models"
	"ftjx/controllers"
)

func main() {

	m := martini.Classic()
	
	m.Use(gzip.All())

	session, err := mgo.Dial("127.0.0.1")
	db := session.DB("FCCS")
	
	if err != nil {
		panic("No Database Connection!")
	}

	m.Map(session)
	m.Map(db)

	m.Use(render.Renderer(render.Options{
		//Layout: "layout",
	}))

	m.Use(martini.Static("static"))
	
	controllers.Managements(m);
/*
	m.Get("/(index\\.html?)?", func(db *mgo.Database, r render.Render) {
	
		ctx := bson.M{}
		c := db.C("links")
		
		// f := models.NewLink("房产网站","房产超市2","http://www.baidu.com");
		// links.Upsert(c, f)
		
		q := services.NewQuery(bson.M{})
		q.Limit(24).Sorts("weight", "_id")
		ctx["Links"], _ = links.List(c, q)
		r.HTML(200, "index", ctx)
	})
*/	
	m.Run()
}
