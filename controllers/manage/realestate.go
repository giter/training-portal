package manage;

import (
	
	"time"
	"regexp"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/martini-contrib/render"
	
	"ftjx/services"
	"ftjx/models"
	"ftjx/utils"
)

func RealEstateCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_REAL_ESTATE);
}

func RealEstateForm(db *mgo.Database, ctx bson.M, req *http.Request, r render.Render) {
	
	var err error
	c := RealEstateCollection(db)
	
	ctx["Areas"], err = services.AreaList(db)
	
	if err != nil {
	
		r.Error(500);
		return
	}
	
	id := req.FormValue("Id");
	
	if id != "" {
	
		var re models.RealEstate
		
		if err := c.FindId(id).One(&re) ; err != nil {
			r.Error(500)
			return
		}
		
		ctx["RealEstate"] = re
	}
	
	if ctx["PictureStat"], err = services.PictureStat(db, id, false, 0); err!=nil {
		r.Error(500)
		return
	}
	
	if ctx["PicturePage"], err = services.PicturePage(db, 16, 0, id, 0); err!=nil {
	
		r.Error(500)
		return
	}
	
	r.HTML(200, "manage-real-estate-form", ctx, render.HTMLOptions{
		Layout: "manage-layout", 
	})
} 

func RealEstateUpsert(db *mgo.Database, req *http.Request, r render.Render) {
	
	var b []byte
	var err error
	
	c := RealEstateCollection(db)
	
	if b, err = ioutil.ReadAll(req.Body); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	var o models.RealEstate
	if err := json.Unmarshal(b, &o); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	if o.Area != nil && o.Area.Id != nil && *o.Area.Id != "" {
		
		var ar *models.Area
		ar, err = services.AreaGet(db, *o.Area.Id);
		o.Area = ar
		if err != nil {
			r.JSON(500, err.Error())
			return
		}
	}
	
	if o.Logo != nil && o.Logo.Id != nil && *o.Logo.Id != ""{
	
		if o.Logo, err = services.PictureGet(db, *o.Logo.Id); err != nil {
		
			r.JSON(500, err.Error())
			return
		}
	}
	
	if o.Cover != nil && o.Cover.Id != nil && *o.Cover.Id != ""{
	
		if o.Cover, err = services.PictureGet(db, *o.Cover.Id); err != nil {
		
			r.JSON(500, err.Error())
			return
		}
	}
	
	if o.MTime == nil {
		o.MTime = new(models.MTime)
	}
	
	o.MTime.Changed = models.NewInt64(time.Now().Unix())
	
	if o.Id == nil || len(*o.Id) == 0 {
	
	
		o.Id = models.NewString(utils.NewShortId())
		o.MTime.Created = models.NewInt64(time.Now().Unix())
		
		if err := c.Insert(o); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}else{
		
		if err := c.UpdateId(o.Id, bson.M{"$set":o}); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}
	
	r.JSON(200, bson.M{"Id":*o.Id});
}

func RealEstateList(db *mgo.Database, req *http.Request, r render.Render) {
	
	c := RealEstateCollection(db)
	
	m := bson.M{}
	
	
	t := req.FormValue("name");
	
	if t != "" {
		m["Name"] = bson.M{"$regex" : regexp.QuoteMeta(t)}
	}
	
	List(c, req, r, m, (func(query *mgo.Query) (interface{}, error) {
		
		var rs []models.RealEstate
		err := query.All(&rs)
		
		return rs, err
	}));
}