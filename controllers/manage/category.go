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
	"ftjx/utils"
)



func CategoryCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_CATEGORY);
}

func CategoryUpsert(db *mgo.Database, req *http.Request, r render.Render) {
	
	var b []byte
	var err error
	
	c := CategoryCollection(db)
	
	if b, err = ioutil.ReadAll(req.Body); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	var category models.Category
	if err := json.Unmarshal(b, &category); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	if category.Weight == nil {
		category.Weight = models.NewInt64(time.Now().Unix())
	}
	
	if category.MTime == nil {
		category.MTime = new(models.MTime)
	}
	
	
	category.MTime.Changed = models.NewInt64(time.Now().Unix())
	
	if category.Id == nil || len(*category.Id) == 0 {
	
		category.Id = models.NewString(utils.NewShortId())
		category.MTime.Created = models.NewInt64(time.Now().Unix())
		
		if err := c.Insert(category); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}else{
		
		if err := c.UpdateId(category.Id, bson.M{"$set":category}); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}
	
	r.JSON(200, bson.M{"Id":*category.Id});
}

func CategoryList(db *mgo.Database, req *http.Request, r render.Render) {
	
	c := CategoryCollection(db)
	
	List(c, req, r, bson.M{}, (func(query *mgo.Query) (interface{}, error) {
		
		var rs []models.Category
		err := query.All(&rs)
		return rs, err
	}));
}