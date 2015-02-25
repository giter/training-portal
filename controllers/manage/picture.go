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



func PictureCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_PICTURE);
}

func PictureUpsert(db *mgo.Database, req *http.Request, r render.Render) {
	
	var b []byte
	var err error
	
	c := PictureCollection(db)
	
	if b, err = ioutil.ReadAll(req.Body); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	var picture models.Picture
	if err := json.Unmarshal(b, &picture); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	if picture.MTime == nil {
		picture.MTime = new(models.MTime)
	}
	
	picture.MTime.Changed = models.NewInt64(time.Now().Unix())
	
	if picture.Resource != nil && picture.Resource.Id != nil {
	
		if picture.Resource, err = services.ResourceGet(db, *picture.Resource.Id); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}
	
	if picture.Id == nil || len(*picture.Id) == 0 {
	
		if picture.Resource == nil || picture.Resource.Id == nil  {
			r.JSON(500, err.Error())
			return
		}
		
		if picture.Large, err = ResourceResize(db, picture.Resource, 960) ; err != nil {
			r.JSON(500, err.Error())
			return
		}
		
		if picture.Big, err = ResourceResize(db, picture.Large, 640) ; err != nil {
			r.JSON(500, err.Error())
			return
		}
		
		if picture.Palm, err = ResourceResize(db, picture.Big, 360) ; err != nil {
			r.JSON(500, err.Error())
			return
		}
		
		if picture.Thumbnail, err = ResourceResize(db, picture.Palm, 120) ; err != nil {
			r.JSON(500, err.Error())
			return
		}
		
		picture.Id = models.NewString(utils.NewShortId())
		picture.MTime.Created = models.NewInt64(time.Now().Unix())
		picture.Weight = models.NewWeight()
		
		if err := c.Insert(picture); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}else{
		
		if err := c.UpdateId(picture.Id, bson.M{"$set":picture}); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}
	
	r.JSON(200, bson.M{"Id":*picture.Id});
}

func PictureList(db *mgo.Database, req *http.Request, r render.Render) {
	
	c := PictureCollection(db)
	
	List(c, req, r, bson.M{}, (func(query *mgo.Query) (interface{}, error) {
		
		var rs []models.Picture
		err := query.All(&rs)
		return rs, err
	}));
}