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

func ManagerCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_MANAGER);
}

func ManagerUpsert(db *mgo.Database, req *http.Request, r render.Render) {
	
	var b []byte
	var err error
	
	c := ManagerCollection(db)
	
	if b, err = ioutil.ReadAll(req.Body); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	var manager models.Manager
	if err := json.Unmarshal(b, &manager); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	if manager.MTime == nil {
		manager.MTime = new(models.MTime)
	}
	
	if manager.Password != nil && *manager.Password == "" {
		manager.Password = nil
	}else{
		manager.Password = models.NewString(models.EncodePassword(*manager.Password));
	}
	
	manager.MTime.Changed = models.NewInt64(time.Now().Unix())
	
	if manager.Id == nil || len(*manager.Id) == 0 {
	
		manager.Id = models.NewString(utils.NewShortId())
		manager.MTime.Created = models.NewInt64(time.Now().Unix())
		
		if err := c.Insert(manager); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}else{
		
		if err := c.UpdateId(manager.Id, bson.M{"$set":manager}); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}
	
	r.JSON(200, bson.M{"Id":*manager.Id});
}

func ManagerList(db *mgo.Database, req *http.Request, r render.Render) {
	
	c := ManagerCollection(db)
	
	List(c, req, r, bson.M{}, (func(query *mgo.Query) (interface{}, error) {
		
		var rs []models.Manager
		err := query.All(&rs)
		return rs, err
	}));
}