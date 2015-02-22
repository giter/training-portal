package services

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"ftjx/models"
	"time"
)


func RealEstateCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_REAL_ESTATE);
}

func RealEstateGet(db *mgo.Database, Id string) (r *models.RealEstate , err error) {
	
	c := RealEstateCollection(db)
	err = c.Find(bson.M{ "_id" : Id }).One(&r)
	
	return
} 

func RealEstateList(db *mgo.Database) (r []models.RealEstate , err error) {

	c := RealEstateCollection(db)
	
	q := bson.M{ }
	q["Status.Disabled"] = bson.M{ "$ne" : true };
	
	err = c.Find(q).Sort("-_id").Skip(0).Limit(10).All(&r)
	return
}

type SRealEstatePage struct {

	Page Page
	Data []models.RealEstate
}

func RealEstatePage(db *mgo.Database) (p SRealEstatePage , err error) {

	c := RealEstateCollection(db)
	
	skip := 0
	limit := 10
	
	var r []models.RealEstate
	
	q := bson.M{ }
	q["Status.Disabled"] = bson.M{ "$ne" : true };
	
	cur := c.Find(q).Sort("-_id").Skip(skip)
	
	if p.Page.Count, err = cur.Count(); err != nil {
		return
	}
	
	if err = cur.Limit(limit).All(&r); err != nil {
		return
	}
	
	p.Page.From = skip
	p.Page.Size = limit
	p.Data = r
	
	return
}

func RealEstateOpens(db *mgo.Database, Count int) (r []models.RealEstate , err error) {

	c := RealEstateCollection(db)
	
	q := bson.M{ }
	q["Status.Disabled"] = bson.M{ "$ne" : true };
	q["Open"] = bson.M{"$gte" : time.Now().Unix()}
	
	err = c.Find(q).Sort("Open").Limit(Count).All(&r)
	return
	
}


func RealEstateDeliveries(db *mgo.Database, Count int) (r []models.RealEstate , err error) {

	c := RealEstateCollection(db)
	
	q := bson.M{ }
	q["Status.Disabled"] = bson.M{ "$ne" : true };
	q["Delivery"] = bson.M{"$gte" : time.Now().Unix()}
	
	err = c.Find(q).Sort("Delivery").Limit(Count).All(&r)
	return
}


func RealEstateGroupBuys(db *mgo.Database, Count int) (r []models.RealEstate , err error) {

	c := RealEstateCollection(db)
	
	q := bson.M{ }
	q["Status.Disabled"] = bson.M{ "$ne" : true };
	q["GroupClose"] = bson.M{"$gte" : time.Now().Unix()}
	
	err = c.Find(q).Sort("GroupClose").Limit(Count).All(&r)
	return
}
