package services

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"ftjx/models"
)


func LinkCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_LINK);
}

func LinkGet(db *mgo.Database, Id string) (r *models.Link , err error) {
	
	c := LinkCollection(db)
	err = c.Find(bson.M{ "_id" : Id }).One(&r)
	
	return
} 

func LinkList(db *mgo.Database) (r []models.Link , err error) {

	c := LinkCollection(db)
	err = c.Find(bson.M{}).Sort("weight", "_id").All(&r)
	
	return
}