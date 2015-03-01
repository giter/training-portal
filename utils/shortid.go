package utils

import (

	//"fmt"

	"gopkg.in/mgo.v2/bson"
)

func NewShortId() string {

	return ToShortId(bson.NewObjectId())
}

func ToShortId(oid bson.ObjectId) string {

	return oid.Hex();
	//return fmt.Sprintf("%x%x", oid.Time().Unix(), oid.Counter() % 256);
}
