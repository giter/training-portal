package services

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"ftjx/models"
)


func CategoryCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_CATEGORY);
}

func CategoryGet(db *mgo.Database, Id string) (r *models.Category , err error) {
	
	c := CategoryCollection(db)
	err = c.Find(bson.M{ "_id" : Id }).One(&r)
	
	return
} 

func CategoryList(db *mgo.Database) (r []models.Category , err error) {

	c := CategoryCollection(db)
	err = c.Find(bson.M{}).All(&r)
	return
}