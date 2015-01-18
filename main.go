package main

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/gzip"
	"github.com/martini-contrib/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"FCCS/controllers"
	"FCCS/models"
)

func main() {

	m := martini.Classic()
	
	m.Use(gzip.All())

	db, err := mgo.Dial("127.0.0.1")

	if err != nil {
		panic("No Database Connection!")
	}

	m.Map(db)

	m.Use(render.Renderer(render.Options{
		Layout: "layout",
	}))

	m.Use(martini.Static("static"))

	m.Get("/(index\\.html?)?", func(db *mgo.Session, r render.Render) {
	
		ctx := bson.M{}
		ctx["Links"], _ = models.LinkList(db.DB("FCCS").C("links"));
		r.HTML(200, "index", ctx)
	})
	
	m.Get("/user", controllers.HelloUser);

	m.Run()
}
