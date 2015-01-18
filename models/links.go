package models

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Link struct {
	
	Id string `bson:"_id"`

	Name   string `bson:"nm"`
	Link   string `bson:"link"`
	Weight string `bson:"w"`
}

func LinkList(db *mgo.Collection) (r []Link, err error){
	
	err = NewQuery(bson.M{}).Sorts("w","_id").Query(db).All(&r)
	return
}