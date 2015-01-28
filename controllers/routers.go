package controllers

import (

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	
	"ftjx/controllers/manage"
)

func ManageIndexRedirection(r render.Render){
	r.Redirect("/manage/index.html");
}

func ManageIndex(r render.Render) {
	r.HTML(200, "manage-index", nil);
}

func Managements(m *martini.ClassicMartini) {
	
	m.Get("/manage/?", ManageIndexRedirection);
	m.Get("/manage/index.html", ManageIndex);
	
	m.Get("/manage/link/index.html", manage.Index("manage-link-index"))
	m.Post("/manage/link/list.json", manage.LinkList)
	m.Post("/manage/link/upsert.json", manage.LinkUpsert)
	
	m.Get("/manage/area/index.html", manage.Index("manage-area-index"));
	m.Post("/manage/area/list.json", manage.AreaList)
	m.Post("/manage/area/upsert.json", manage.AreaUpsert)
	
	m.Get("/manage/real-estate-company/index.html", manage.Index("manage-real-estate-company-index"));
	m.Post("/manage/real-estate-company/list.json", manage.RealEstateCompanyList)
	m.Post("/manage/real-estate-company/upsert.json", manage.RealEstateCompanyUpsert)
}