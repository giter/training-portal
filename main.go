package main

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/gzip"
	"github.com/martini-contrib/render"
	"gopkg.in/mgo.v2"
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

	m.Get("/(index\\.html?)?", func(r render.Render) {

		r.HTML(200, "index", nil)
	})

	m.Run()
}
