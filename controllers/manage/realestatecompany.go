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



func RealEstateCompanyCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_REAL_ESTATE_COMPANY);
}

func RealEstateCompanyUpsert(db *mgo.Database, req *http.Request, r render.Render) {
	
	var b []byte
	var err error
	
	c := RealEstateCompanyCollection(db)
	
	if b, err = ioutil.ReadAll(req.Body); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	var o models.RealEstateCompany
	if err := json.Unmarshal(b, &o); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	o.MTime.Changed = time.Now().Unix()
	
	if o.Id == "" {
	
		o.Id = bson.NewObjectId().Hex()
		o.MTime.Created = time.Now().Unix()
		
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
	
	r.JSON(200, bson.M{"Id":o.Id});
}

func RealEstateCompanyList(db *mgo.Database, req *http.Request, r render.Render) {
	
	c := RealEstateCompanyCollection(db)
	
	m := bson.M{}
	
	t := req.FormValue("title");
	
	if t != "" {
		m["title"] = bson.M{"$regex" : t}
	}
	
	
	List(c, req, r, m, (func(query *mgo.Query) (interface{}, error) {
		
		var rs []models.RealEstateConduitCompany
		err := query.All(&rs)
		
		return rs, err
	}));
}