package manage;

import (
	
	"time"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/martini-contrib/render"
	
	"ftjx/models"
	"ftjx/services"
	"ftjx/utils"
)



func LayoutCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_LAYOUT);
}

func LayoutOne(db *mgo.Database, req *http.Request, r render.Render) {

	var b []byte
	var err error
	var m   *models.Layout = &models.Layout{}
	
	if b, err = ioutil.ReadAll(req.Body); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	if err := json.Unmarshal(b, m); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	Id := *m.Id
	
	if Id == "" {
		r.Error(500);
		return
	}
	
	if m, err = services.LayoutGet(db, *m.Id); err != nil {
		r.Error(500);
		return
	}
	
	r.JSON(200, m);
}

func LayoutDelete(db *mgo.Database, req *http.Request, r render.Render) {

	c := LayoutCollection(db)
	
	var b []byte
	var err error
	var m   *models.Layout = &models.Layout{}
	
	if b, err = ioutil.ReadAll(req.Body); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	if err := json.Unmarshal(b, m); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	Id := *m.Id
	
	if Id == "" {
	
		r.JSON(500, "No id specified!")
		return
	}
	
	if m, err = services.LayoutGet(db, Id); err != nil {
	
		r.JSON(500, err.Error())
		return
	}
	
	retVal := bson.M { "Id" : Id}
	
	if m.Image != nil && m.Image.Id != nil {
		
		if err = PictureDeletion(db, *m.Image.Id); err != nil {
			r.Error(500);
			return
		}
	}
	
	if err = c.RemoveId(Id); err != nil {
	
		r.Error(500);
		return
	}
	
	r.JSON(200, retVal)
	return
}

func LayoutUpsert(db *mgo.Database, req *http.Request, r render.Render) {
	
	var b []byte
	var err error
	
	c := LayoutCollection(db)
	
	if b, err = ioutil.ReadAll(req.Body); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	var layout models.Layout
	if err := json.Unmarshal(b, &layout); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	if layout.MTime == nil {
		layout.MTime = new(models.MTime)
	}
	
	layout.MTime.Changed = models.NewInt64(time.Now().Unix())
	
	if layout.Image != nil && layout.Image.Id != nil {
	
		if layout.Image, err = services.PictureGet(db, *layout.Image.Id); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}
	
	if layout.Id == nil || len(*layout.Id) == 0 {
	
		layout.Id = models.NewString(utils.NewShortId())
		layout.MTime.Created = models.NewInt64(time.Now().Unix())
		
		if err := c.Insert(layout); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}else{
		
		if err := c.UpdateId(layout.Id, bson.M{"$set":layout}); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}
	
	r.JSON(200, bson.M{"Id":*layout.Id});
}

func LayoutList(db *mgo.Database, req *http.Request, r render.Render) {
	
	c := LayoutCollection(db)
	
	List(c, req, r, bson.M{}, (func(query *mgo.Query) (interface{}, error) {
		
		var rs []models.Layout
		err := query.All(&rs)
		return rs, err
	}));
}