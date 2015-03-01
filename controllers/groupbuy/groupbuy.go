package groupbuy

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/martini-contrib/render"
	
	"ftjx/services"
)

//团购页
func Index(db *mgo.Database, ctx bson.M, r render.Render) {

	var err error

	if ctx["GroupbuyRecommends"], err = services.RealEstateGroupBuyRecommends(db, 3) ; err != nil {
		r.Error(500)
		return
	}
	
	if ctx["GroupbuyNewest"], err = services.RealEstateGroupBuys(db, 6) ; err != nil {
		r.Error(500)
		return
	}

	r.HTML(200, "groupbuy-index", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}