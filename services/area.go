package services

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"ftjx/models"
)


func AreaCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_AREA);
}

func AreaGet(db *mgo.Database, Id string) (r *models.Area , err error) {
	
	c := AreaCollection(db)
	err = c.Find(bson.M{ "_id" : Id }).One(&r)
	
	return
} 

func AreaList(db *mgo.Database) (r []models.Area , err error) {

	c := AreaCollection(db)
	err = c.Find(bson.M{ "City" : "嘉兴" }).All(&r)
	return
}