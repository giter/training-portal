package utils

import (

	"fmt"

	"gopkg.in/mgo.v2/bson"
)

func NewShortId() string {

	return ToShortId(bson.NewObjectId())
}

func ToShortId(oid bson.ObjectId) string {

	time := int64(oid.Time().Unix()) * 256
	time = time - int64(1420070400) * 256
	time = time + int64(oid.Counter() % 256)
	
	return fmt.Sprintf("%x", time);
}
