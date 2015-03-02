package news

import (
	
	"time"
	
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	
	"ftjx/forms"
	"ftjx/services"
)

//资讯首页
func Index(db *mgo.Database, ctx bson.M, query forms.NewsForm, r render.Render) {
	
	var err error
	
	ctx["Date"] = time.Now().Format("2006-01-02")
	
	switch time.Now().Weekday() {
	case time.Sunday:
		ctx["Weekday"] = "星期日"
	case time.Monday:
		ctx["Weekday"] = "星期一"
	case time.Tuesday:
		ctx["Weekday"] = "星期二"
	case time.Wednesday:
		ctx["Weekday"] = "星期三"
	case time.Thursday:
		ctx["Weekday"] = "星期四"
	case time.Friday:
		ctx["Weekday"] = "星期五"
	case time.Saturday:
		ctx["Weekday"] = "星期六"
	}
	
	if ctx["Recommends"], err = services.NewsRecommends(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewsView"], err = services.NewsListByCode(db, services.CATEGORY_VIEW, 9) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["NewsSpecial"], err = services.NewsListByCode(db, services.CATEGORY_SPECIAL, 9) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["NewsLeader"], err = services.NewsListByCode(db, services.CATEGORY_LEADER, 9) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["NewsSole"], err = services.NewsListByCode(db, services.CATEGORY_SOLE, 9) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["NewsData"], err = services.NewsListByCode(db, services.CATEGORY_DATA, 9) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["NewsList"], err = services.NewsPage(db, query); err != nil {
		r.Error(500)
		return
	}
	
	r.HTML(200, "news-index", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}


func DetailIndex(db *mgo.Database, ctx bson.M, r render.Render, params martini.Params) {
	
	var err error
	
	Id := params["id"]
	
	if ctx["News"], err = services.NewsGet(db, Id); (err!=nil&&err!=mgo.ErrNotFound) || ctx["News"] == nil {
		
		r.Error(404);
		return
	}
	
	if err = services.ViewInc(services.NewsCollection(db), Id); err != nil {
		r.Error(500)
		return
	}
	
	if ctx["NewsView"], err = services.NewsListByCode(db, services.CATEGORY_VIEW, 9) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["NewsSpecial"], err = services.NewsListByCode(db, services.CATEGORY_SPECIAL, 9) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["NewsLeader"], err = services.NewsListByCode(db, services.CATEGORY_LEADER, 9) ; err != nil {
		r.Error(500)
		return
	}
	
	/*
	if ctx["NewsSoleSingle"], err = services.NewsListByCode(db, services.CATEGORY_SOLE, 1) ; err != nil {
		r.Error(500)
		return
	}
	*/
	
	if ctx["NewsSole"], err = services.NewsListByCode(db, services.CATEGORY_SOLE, 9) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["NewsData"], err = services.NewsListByCode(db, services.CATEGORY_DATA, 9) ; err != nil {
		r.Error(500)
		return
	}
	
	r.HTML(200, "news-detail-index", ctx, render.HTMLOptions{
		Layout: "layout",
	});
	
}