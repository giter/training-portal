package news

import (
	
	"time"
	
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/martini-contrib/render"
	
	"ftjx/services"
)

//资讯首页
func Index(db *mgo.Database, ctx bson.M, r render.Render) {
	
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
	
	ctx["Recommends"], _ = services.NewsRecommends( db, 7 ) 
	
	r.HTML(200, "news-index", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}