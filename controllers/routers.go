package controllers

import (

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	
	"ftjx/controllers/links"
)


func Managements(m *martini.ClassicMartini) {
	
	m.Get("/manage/index.html", func(r render.Render) {
		r.HTML(200, "manage-index", nil);
	});
	m.Get("/manage/links/list.html", links.Manage)
	m.Post("/manage/links/data.json", links.Data)
}