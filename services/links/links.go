package links

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"time"
	
	. "ftjx/models"
	"ftjx/services"
)

func Upsert(c *mgo.Collection, link Link) (err error){
	
	link.MTime.Changed = time.Now().Unix()
	
	if link.Id == "" {
	
		link.Id = bson.NewObjectId().Hex()
		link.MTime.Created = time.Now().Unix()
		err = c.Insert(link)
	} else {
		err = c.UpdateId(link.Id, link)
	}
	
	return
}

func One(c *mgo.Collection, Id string) (r Link, err error) {

	err = c.FindId(Id).One(r)
	return
}

func Remove(c *mgo.Collection, Id string) (err error) {

	c.RemoveId(Id)
	return
}

func List(c *mgo.Collection, query *services.Q) (r []Link, err error){
	
	err = query.Query(c).All(&r)
	return
}

func Page(c *mgo.Collection, query *services.Q) (r []Link, cnt int, err error){
	
	iter := query.Query(c)
	
	if err = iter.All(&r) ; err != nil {
		return
	}
	
	iter.Limit(0).Skip(0)
	if cnt, err = iter.Count() ; err != nil {
		return
	}
	
	return
}