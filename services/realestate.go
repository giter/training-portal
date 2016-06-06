package services

import (

	"time"
	"strings"
	"strconv"
	
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"ftjx/models"
	"ftjx/forms"
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

	Page *Page
	Data []models.RealEstate
}

func RealEstateAll(db *mgo.Database, fields bson.M) (p []models.RealEstate , err error ) {

	c := RealEstateCollection(db)
	
	q := bson.M{ }
	q["Status.Disabled"] = bson.M{ "$ne" : true }
	
	err = c.Find(q).Select(fields).All(&p)
	return
}

func RealEstatePage(db *mgo.Database, query forms.RealEstatePageForm) (p SRealEstatePage , err error) {

	c := RealEstateCollection(db)
	p.Page = &Page{}
	
	limit := 10
	skip := query.Page * limit - limit
	
	if skip < 0 {
		skip = 0
	}
	
	var r []models.RealEstate
	
	q := bson.M{ }
	q["Status.Disabled"] = bson.M{ "$ne" : true };
	
	if query.Usage > 0{
		q["Usage"] = query.Usage
	}
	
	if query.Floor > 0 {
		q["Floor"] = query.Floor
	}
	
	if query.Letter != "" {
		q["Captions"] = strings.ToUpper(query.Letter)
	}
	
	if query.Schedule > 0 {
		q["Schedule"] = query.Schedule
	}
	
	if query.Area != "" {
		q["Area._id"] = query.Area
	}
	
	if query.Feature != "" {
		q["Features"] = query.Feature
	}
	
	if query.Price != "" && strings.Index(query.Price, ",") > 0 {
		
		ps := strings.Split(query.Price, ",")
		
		if ps[1] == "0" {
			ps[1] = "999999999"
		}
		
		ips := make([]int64, 2)
		
		if ips[0], err = strconv.ParseInt(ps[0], 10, 32) ; err != nil {
			return
		}
		
		if ips[1], err = strconv.ParseInt(ps[1], 10, 32) ; err != nil {
			return 
		}
		
		q["Price"] = bson.M{ "$lte": ips[1], "$gte": ips[0] }
	}
	
	if query.PriceType > 0 {
		q["PriceType"] = query.PriceType
	}
	
	cur := c.Find(q).Sort("-_id")
	
	if p.Page.Count, err = cur.Count(); err != nil {
		return
	}
	
	cur.Skip(skip)
	
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


func RealEstateGroupBuyRecommends(db *mgo.Database, Count int) (r []models.RealEstate , err error) {
	
	c := RealEstateCollection(db)
	
	q := bson.M{ }
	
	q["Status.Disabled"] = bson.M{ "$ne" : true };
	q["Status.Indexed"] = bson.M{ "$eq" : true };
	q["GroupClose"] = bson.M{"$gte" : time.Now().Unix()}
	
	err = c.Find(q).Sort("GroupClose","-Recommendation").Limit(Count).All(&r)
	
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

func RealEstateRecommends(db *mgo.Database, Count int) (r []models.RealEstate , err error) {

	c := RealEstateCollection(db)
	
	q := bson.M{ }
	q["Status.Disabled"] = bson.M{ "$ne" : true };
	q["Status.Recommendation"] = bson.M{"$gt": -9999999}
	err = c.Find(q).Sort("-Status.Recommendation").Limit(Count).All(&r)
	return
}

func RealEstateFocus(db *mgo.Database, Count int) (r []models.RealEstate , err error) {

	c := RealEstateCollection(db)
	
	q := bson.M{ }
	q["Status.Disabled"] = bson.M{ "$ne" : true };
	q["Status.Attention"] = bson.M{"$gt": -9999999}
	err = c.Find(q).Sort("-Status.Attention").Limit(Count).All(&r)
	return
}

func RealEstatePictures(db *mgo.Database, Id string, Type int64, Count int)(r []models.Picture, err error) {
	
	return PictureList(db, Id, Type, Count)
}
