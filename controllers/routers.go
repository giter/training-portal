package controllers

import (

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	
	"ftjx/controllers/links"
)

func ManageIndexRedirection(r render.Render){
	r.Redirect("/manage/index.html");
}

func ManageIndex(r render.Render) {
	r.HTML(200, "manage-index", nil , render.HTMLOptions{});
}

func Managements(m *martini.ClassicMartini) {
	
	m.Get("/manage/?", ManageIndexRedirection);
	m.Get("/manage/index.html", ManageIndex);
	
	m.Get("/manage/links/list.html", links.Manage)
	m.Post("/manage/links/data.json", links.Data)
	m.Post("/manage/links/upsert.json", links.Upsert)
}