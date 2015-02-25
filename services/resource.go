package services

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"ftjx/models"
)


func ResourceCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_RESOURCE);
}

func ResourceGet(db *mgo.Database, Id string) (r *models.Resource , err error) {
	
	c := ResourceCollection(db)
	err = c.Find(bson.M{ "_id" : Id }).One(&r)
	
	return
} 

func ResourceList(db *mgo.Database) (r []models.Resource , err error) {

	c := ResourceCollection(db)
	err = c.Find(bson.M{}).Sort("_id").All(&r)
	
	return
}