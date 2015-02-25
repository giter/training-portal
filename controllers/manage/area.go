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



func AreaCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_AREA);
}

func AreaUpsert(db *mgo.Database, req *http.Request, r render.Render) {
	
	var b []byte
	var err error
	
	c := AreaCollection(db)
	
	if b, err = ioutil.ReadAll(req.Body); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	var area models.Area
	
	if err := json.Unmarshal(b, &area); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	if area.MTime == nil {
		area.MTime = & models.MTime {}
	}
	
	area.MTime.Changed = models.NewInt64(time.Now().Unix())
	
	if area.Id == nil || len(*area.Id) == 0 {
		
		area.Id = models.NewString(utils.NewShortId())
		area.MTime.Created = models.NewInt64(time.Now().Unix())
		
		if err := c.Insert(area); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}else{
		
		if err := c.UpdateId(area.Id, bson.M{"$set":area}); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}
	
	r.JSON(200, bson.M{"Id":*area.Id});
}

func AreaList(db *mgo.Database, req *http.Request, r render.Render) {
	
	c := AreaCollection(db)
	
	List(c, req, r, bson.M{}, (func(query *mgo.Query) (interface{}, error) {
		
		var rs []models.Area
		err := query.All(&rs)
		return rs, err
	}));
}