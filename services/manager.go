package services;

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	. "ftjx/models"
)

func Login(c *mgo.Collection, Account string, Password string) (mm *Manager, err error) {

	q := NewQuery(bson.M{Account:Account, Password:EncodePassword(Password)})
	err = q.Query(c).One(mm);
	
	return
}