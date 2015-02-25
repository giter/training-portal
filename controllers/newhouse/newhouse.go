package newhouse

import (

	"net/http"
	"strconv"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	
	"ftjx/services"
	"ftjx/forms"
)

func Letters() []string {

	letters := "abcdefghijklmnopqrstuvwxyz"
	m := make([]string, 0, 30)
	for i:=0;i<len(letters);i=i+1 {
		m = append(m, letters[i:i+1]);
	}
	return m
}

//新房首页
func Index(db *mgo.Database, ctx bson.M, r render.Render) {
	
	var err error
	
	//友情链接
	if ctx["Links"], err = services.LinkList(db); err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseDeliveries"], err = services.RealEstateDeliveries(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseOpens"], err = services.RealEstateOpens(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseFocus"], err = services.RealEstateFocus(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseRecommends"], err = services.RealEstateRecommends(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	ctx["Letters"] = Letters()
	
	r.HTML(200, "newhouse-index", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}

//楼盘大全
func List(db *mgo.Database, ctx bson.M, r render.Render, query forms.RealEstatePageForm) {
	
	var err error
	
	//友情链接
	if ctx["Links"], err = services.LinkList(db); err!= nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseDeliveries"], err = services.RealEstateDeliveries(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseOpens"], err = services.RealEstateOpens(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseFocus"], err = services.RealEstateFocus(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhouseRecommends"], err = services.RealEstateRecommends(db, 8) ; err != nil {
		r.Error(500);
		return
	}
	
	if ctx["NewhousePage"], err = services.RealEstatePage(db, query); err!=nil{
		r.Error(500);
		return
	}
	
	ctx["Letters"] = Letters()
	
	r.HTML(200, "newhouse-list", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}

func DetailIndex(db *mgo.Database, ctx bson.M, r render.Render, params martini.Params) {
	
	var err error
	
	Id := params["id"]
	
	if ctx["Newhouse"], err = services.RealEstateGet(db, Id); err != nil || ctx["Newhouse"] == nil {
		
		r.Error(404);
		return
	}
	
	if ctx["NewhousePictures"], err = services.RealEstatePictures(db, Id, 0 , 5); err != nil {
		
		r.Error(500);
		return
	}
	
	if ctx["PictureStatus"] , err = services.PictureStat(db, Id, true, 0); err != nil {
		r.Error(500);
		return
	}
	
	r.HTML(200, "newhouse-detail-index", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}

func PictureIndex(db *mgo.Database, req *http.Request, ctx bson.M, r render.Render, params martini.Params) {
	
	var err error
	
	Id := params["id"]
	
	Type := params["typo"]
	
	if Type == "" {
		Type = "0"
	}
	
	var typo int64
	
	if typo, err = strconv.ParseInt(Type, 10, 64 ) ; err != nil {
	
		r.Error(404);
		return
	}
	
	ctx["PictureType"] = int(typo)
	
	if typo > 0 {
		ctx["PictureTypeName"] = services.KVs(db)["PictureType"].Values[int(typo)]
	}
	
	if ctx["Newhouse"], err = services.RealEstateGet(db, Id); err != nil || ctx["Newhouse"] == nil {
		
		r.Error(404);
		return
	}
	
	count := 4
	if typo > 0 {
		count = 0
	}
	
	if ctx["PictureStatus"] , err = services.PictureStat(db, Id, false, count); err != nil {
		r.Error(500);
		return
	}
	
	if typo > 0 {
	
		page, _ := strconv.ParseInt(req.FormValue("p"), 10, 64)
		
		if ctx["PicturePage"] , err = services.PicturePage(db, 16, int(page), Id, int64(typo)); err != nil {
			r.Error(500);
			return
		}
	}
	
	r.HTML(200, "newhouse-picture-index", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}

