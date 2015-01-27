package links;

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
	"ftjx/services/links"
)

const CollectionName = "links";

func Collection(db *mgo.Database) *mgo.Collection {
	
	return db.C(CollectionName);
}

func Manage(db *mgo.Database, r render.Render) {

	ctx := bson.M{}
	c := Collection(db)
	
	q := services.NewQuery(bson.M{})
	
	ctx["Links"], _ = links.List(c, q)
	
	r.HTML(200, "manage-links-list", ctx);
}

func Upsert(db *mgo.Database, req *http.Request, r render.Render) {

	var b []byte
	var err error
	
	c := Collection(db)
	
	if b, err = ioutil.ReadAll(req.Body); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	var link models.Link
	if err := json.Unmarshal(b, &link); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	link.MTime.Changed = time.Now().Unix()
	
	if link.Id == "" {
	
		link.Id = bson.NewObjectId().Hex()
		link.MTime.Created = time.Now().Unix()
		
		if err := c.Insert(link); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}else{
		
		if err := c.UpdateId(link.Id, link); err != nil {
			r.JSON(500, err.Error())
			return
		}
	}
	
	r.JSON(200, bson.M{"Id":link.Id});
}

func Data(db *mgo.Database, req *http.Request, r render.Render) {
	
	c := Collection(db)
	
	var total, cnt int
	var rs []models.Link
	
	err := req.ParseForm();
	if err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	action := req.FormValue("action");
	
	if action == "delete" {
	
		ids := req.Form["id[]"]
		if len(ids) > 0 {
			dels := bson.M{ "_id": bson.M{"$in": ids} }
			if _, err = c.RemoveAll(dels); err!= nil {
				r.JSON(500, err.Error())
			}
		}
	}
	
	if err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	q := services.DataQuery(req)
	q.Sorts("weight","_id");
	
	if total, err = c.Count() ; err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	if rs, cnt, err = links.Page(c, q); err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	//{"data":[],"draw":0,"recordsTotal":2430,"recordsFiltered":2430}
	r.JSON(200, bson.M{
		"recordsTotal": total, 
		"recordsFiltered": cnt,
		"data": rs,
	});
}