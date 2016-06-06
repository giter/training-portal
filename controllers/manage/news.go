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



func NewsCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_NEWS);
}

func NewsForm(db *mgo.Database, ctx bson.M, req *http.Request, r render.Render) {
	
	var err error
	c := NewsCollection(db)
	
	if ctx["Categories"], err = services.CategoryList(db); err!=nil && err!=mgo.ErrNotFound {
		r.Error(500);
		return
	}
	
	fields := bson.M{"_id": 1, "Name": 1, "Captain": 1, }
	
	if ctx["RealEstates"], err = services.RealEstateAll(db, fields); err!=nil && err!=mgo.ErrNotFound {
		r.Error(500)
		return
	}
	
	id := req.FormValue("Id");
	
	if id != "" {
	
		var re models.News
		
		if err := c.FindId(id).One(&re) ; err != nil {
			r.Error(500)
			return
		}
		
		ctx["News"] = re
	}
	
	r.HTML(200, "manage-news-form", ctx, render.HTMLOptions{
		Layout: "manage-layout", 
	})
} 

func NewsUpsert(db *mgo.Database, req *http.Request, r render.Render) {
	
	var b []byte
	var err error
	
	c := NewsCollection(db)
	
	if b, err = ioutil.ReadAll(req.Body); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	var o models.News
	if err := json.Unmarshal(b, &o); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	if o.MTime == nil {
		o.MTime = new(models.MTime)
	}
	
	if len(o.Category) > 0 {
		
		for i := 0 ; i < len(o.Category) ; i = i + 1 {
			
			c, _ := services.CategoryGet(db, *o.Category[i].Id)
			
			if c != nil {
				o.Category[i] = *c;
			}
		}
	}
	
	o.MTime.Changed = models.NewInt64(time.Now().Unix())
	
	if o.Cover != nil && o.Cover.Id != nil && *o.Cover.Id != ""{
	
		if o.Cover, err = services.PictureGet(db, *o.Cover.Id); err != nil {
		
			r.JSON(500, err.Error())
			return
		}
	}
	
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

func NewsList(db *mgo.Database, req *http.Request, r render.Render) {
	
	c := NewsCollection(db)
	
	m := bson.M{}
	
	
	t := req.FormValue("name");
	
	if t != "" {
		m["name"] = bson.M{"$regex" : regexp.QuoteMeta(t)}
	}
	
	List(c, req, r, m, (func(query *mgo.Query) (interface{}, error) {
		
		var rs []models.News
		query.Sort("-Time", "-_id");
		err := query.All(&rs)
		
		return rs, err
	}));
}