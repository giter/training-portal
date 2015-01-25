package links;

import (

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

func Data(db *mgo.Database, req *http.Request, r render.Render) {
	
	c := Collection(db)
	
	var total, cnt int
	var rs []models.Link
	err := req.ParseForm()
	
	if err != nil {
		r.JSON(500, err.Error())
	}
	
	q := services.DataQuery(req)
	
	if total, err = c.Count() ; err != nil {
		r.JSON(500, err.Error())
	}
	
	if rs, cnt, err = links.Page(c, q); err != nil {
		r.JSON(500, err.Error())
	}
	
	//{"data":[],"draw":0,"recordsTotal":2430,"recordsFiltered":2430}
	r.JSON(200, bson.M{
		"recordsTotal": total, 
		"recordsFiltered": cnt,
		"data": rs,
	});
}