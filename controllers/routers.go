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
	
	//友情链接
	m.Get("/manage/link/index.html", manage.Index("manage-link-index"))
	m.Post("/manage/link/list.json", manage.LinkList)
	m.Post("/manage/link/upsert.json", manage.LinkUpsert)
	
	//区域管理
	m.Get("/manage/area/index.html", manage.Index("manage-area-index"));
	m.Post("/manage/area/list.json", manage.AreaList)
	m.Post("/manage/area/upsert.json", manage.AreaUpsert)

	//管理帐号
	m.Get("/manage/manager/index.html", manage.Index("manage-manager-index"));
	m.Post("/manage/manager/list.json", manage.ManagerList)
	m.Post("/manage/manager/upsert.json", manage.ManagerUpsert)
	
	//资讯分类
	m.Get("/manage/category/index.html", manage.Index("manage-category-index"));
	m.Post("/manage/category/list.json", manage.CategoryList)
	m.Post("/manage/category/upsert.json", manage.CategoryUpsert)
	
	//房产公司
	m.Get("/manage/real-estate-company/index.html", manage.Index("manage-real-estate-company-index"));
	m.Post("/manage/real-estate-company/list.json", manage.RealEstateCompanyList)
	m.Post("/manage/real-estate-company/upsert.json", manage.RealEstateCompanyUpsert)

	//新房楼盘
	m.Get("/manage/real-estate/index.html", manage.Index("manage-real-estate-index"));
	m.Get("/manage/real-estate/form.html", manage.RealEstateForm);
	m.Post("/manage/real-estate/list.json", manage.RealEstateList)
	m.Post("/manage/real-estate/upsert.json", manage.RealEstateUpsert)

	//新房楼盘
	m.Get("/manage/news/index.html", manage.Index("manage-news-index"));
	m.Get("/manage/news/form.html", manage.NewsForm);
	m.Post("/manage/news/list.json", manage.NewsList)
	m.Post("/manage/news/upsert.json", manage.NewsUpsert)

}