package services

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"time"
)

type ICollection interface {
	Collection() *mgo.Collection
}

type CRUD struct {
	ICollection
}

type State struct {
	CRUD
	State int `bson:"state"`
}

func (c *CRUD) Create(o bson.M) (string, error) {

	m := c.Collection()
	
	if _, err := o["_id"] ; err {
		o["_id"] = bson.NewObjectId().Hex()
	}
	
	o["created"] = time.Now().Unix()
	o["updated"] = time.Now().Unix()
	
	return o["_id"].(string), m.Insert(o)
}

func (c *CRUD) Update(Id string, o bson.M) error{

	m := c.Collection()
	
	if _, err := o["$set"]; err {
		o["$set"] = bson.M{}
	}
	
	(o["$set"].(bson.M))["updated"] = time.Now().Unix() 
	
	return m.UpdateId(Id, o)
}

func (c *CRUD) UpdateAll(s bson.M, o bson.M) error{

	m := c.Collection()

	if _, err := o["$set"]; err {
		o["$set"] = bson.M{}
	}
	
	(o["$set"].(bson.M))["updated"] = time.Now().Unix() 

	_, err := m.UpdateAll(s, o)
	return err
}

func (c *CRUD) Remove(Id string) error{
	
	m := c.Collection()
	return m.Remove(Id)
}

func (c *CRUD) RemoveAll(s bson.M) error {

	m := c.Collection()
	_, err := m.RemoveAll(s)
	return err
}

func (c *CRUD) Get(Id string) (v bson.M, err error) {
	
	m := c.Collection()
	err = m.FindId(Id).One(v)
	
	return
}

func (c *CRUD) List(query *Q) (r interface{} , err error) {

	m := c.Collection()
	err = query.Query(m).All(r)
	return 
}
