package controllers

import (

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/binding"
	
	"ftjx/controllers/index"
	"ftjx/controllers/newhouse"
	"ftjx/controllers/news"
	"ftjx/controllers/groupbuy"
	"ftjx/controllers/manage"
	"ftjx/controllers/misc"
	"ftjx/controllers/user"
	
	"ftjx/forms"
)

func ManageIndexRedirection(r render.Render){
	r.Redirect("/manage/index.html");
}

func ManageIndex(r render.Render) {
	r.HTML(200, "manage-index", nil, render.HTMLOptions{
		Layout: "manage-layout", 
	});
}

func Misc(m *martini.ClassicMartini){
	m.Get("/validation", misc.Validation);
}

func Index(m *martini.ClassicMartini){

	m.Get("/", index.Index);
	m.Get("/index.html", index.Index);
}

func NewHouse(m *martini.ClassicMartini){

	m.Get("/newhouse/", newhouse.Index);
	m.Get("/newhouse/index.html", newhouse.Index);
	m.Get("/newhouse/list.html", binding.Bind(forms.RealEstatePageForm{}), newhouse.List);
	m.Get("/newhouse/o:id.html", newhouse.DetailIndex);
	m.Get("/newhouse/i:id.html", newhouse.DetailIntroduction);
	m.Get("/newhouse/e:id.html", newhouse.EnviromentIndex);
	m.Get("/newhouse/n:id.html", binding.Bind(forms.NewsForm{}), newhouse.NewsIndex);
	m.Get("/newhouse/p:id.html", newhouse.PictureIndex);
	m.Get("/newhouse/p:id/list-:typo.html", newhouse.PictureIndex);
	m.Get("/newhouse/l:id.html", newhouse.LayoutIndex);
	m.Get("/newhouse/l:id/list-:typo.html", newhouse.LayoutIndex);
}

func News(m *martini.ClassicMartini) {

	m.Get("/news/", binding.Bind(forms.NewsForm{}), news.Index);
	m.Get("/news/index.html", binding.Bind(forms.NewsForm{}), news.Index);
	m.Get("/news/o:id.html", news.DetailIndex);
}

func GroupBuy(m *martini.ClassicMartini) {
	m.Get("/groupbuy/", groupbuy.Index);
	m.Get("/groupbuy/index.html", groupbuy.Index);
}

func User(m *martini.ClassicMartini) {

	m.Get("/login.html", user.Login);
	m.Post("/login.html", binding.Bind(forms.LoginForm{}), user.UserLogin);
	m.Get("/logout.html", user.Logout);
	
	m.Get("/register-check.json", binding.Bind(forms.AccountCheckForm{}), user.RegisterCheck);
	
	m.Get("/register.html", user.Register);
	m.Post("/register.html", binding.Bind(forms.RegisterForm{}), user.UserRegister);
	
	m.Get("/user/", user.Index);
	m.Get("/user/index.html", user.Index);
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
	
	//文件上传组件
	m.Post("/manage/upload.json", binding.Bind(forms.ResourceForm{}), manage.ResourceUpload)

	//图片管理
	m.Get("/manage/picture/index.html", manage.Index("manage-picture-index"));
	m.Post("/manage/picture/list.json", manage.PictureList)
	m.Post("/manage/picture/upsert.json", manage.PictureUpsert)
	m.Post("/manage/picture/delete.json", manage.PictureDelete)

	//户型管理
	m.Post("/manage/layout/list.json", manage.LayoutList)
	m.Post("/manage/layout/upsert.json", manage.LayoutUpsert)
	m.Post("/manage/layout/delete.json", manage.LayoutDelete)
	m.Post("/manage/layout/one.json", manage.LayoutOne)


}