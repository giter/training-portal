package index

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/martini-contrib/render"
	
	"ftjx/services"
)

func Index(db *mgo.Database, ctx bson.M, r render.Render) {
	
	var err error
	
	//友情链接
	if ctx["Links"], err = services.LinkList(db); err != nil {
		r.Error(500)
		return
	}
	
	if ctx["Areas"], err = services.AreaList(db); err != nil {
		r.Error(500)
		return
	}
	
	if ctx["Headlines"], err = services.NewsHeadlines(db); err != nil {
		r.Error(500)
		return
	}
	
	if ctx["Recommends"], err = services.NewsRecommends(db, 18); err != nil {
		r.Error(500)
		return
	}
	
	if ctx["Days"], err = services.NewsListByCode(db,services.CATEGORY_DAY,5); err != nil {
		r.Error(500)
		return
	}
	
	if ctx["Weeks"], err = services.NewsListByCode(db,services.CATEGORY_WEEK,5); err != nil {
		r.Error(500)
		return
	}
	
	if ctx["Months"], err = services.NewsListByCode(db,services.CATEGORY_MONTH,5); err != nil {
		r.Error(500)
		return
	}
	
	if ctx["Leaders"], err = services.NewsListByCode(db, services.CATEGORY_LEADER, 7) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["Locals"], err = services.NewsListByCode(db, services.CATEGORY_LOCAL, 9) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["Soles"], err = services.NewsListByCode(db, services.CATEGORY_SOLE, 7) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["Lands"], err = services.NewsListByCode(db, services.CATEGORY_LAND, 9) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["Opens"], err = services.RealEstateOpens(db, 8) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["Deliveries"], err = services.RealEstateDeliveries(db, 8) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["GroupBuys"], err = services.RealEstateGroupBuys(db, 6) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["Tops"], err  = services.Tops() ; err != nil {
		r.Error(500)
		return
	}
	
	ctx["Query"] = bson.M{}
	
	r.HTML(200, "index", ctx, render.HTMLOptions{
		Layout: "layout", 
	});
}