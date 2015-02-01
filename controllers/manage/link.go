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
)



func LinkCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_LINK);
}

func LinkUpsert(db *mgo.Database, req *http.Request, r render.Render) {

	var b []byte
	var err error
	
	c := LinkCollection(db)
	
	if b, err = ioutil.ReadAll(req.Body); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	var link models.Link
	if err := json.Unmarshal(b, &link); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	if link.MTime == nil {
		link.MTime = new(models.MTime)
	}
	
	link.MTime.Changed = models.NewInt64(time.Now().Unix())
	
	if link.Id == nil || len(*link.Id) == 0 {
	
		link.Id = models.NewString(bson.NewObjectId().Hex())
		link.MTime.Created = models.NewInt64(time.Now().Unix())
		
		if err := c.Insert(link); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}else{
		
		if err := c.UpdateId(link.Id, bson.M{"$set":link}); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}
	
	r.JSON(200, bson.M{"Id":*link.Id});
}

func LinkList(db *mgo.Database, req *http.Request, r render.Render) {
	
	List(LinkCollection(db), req,r, bson.M{}, (func(query *mgo.Query) (interface{}, error) {
		
		var rs []models.Link
		err := query.All(&rs)
		return rs, err
	}))
}