package services

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"ftjx/models"
)

const (
	
	CATEGORY_LOCAL = "local"
	CATEGORY_LEADER = "leader"
	CATEGORY_SPECIAL = "special"
	CATEGORY_POLICY = "policy"
	CATEGORY_VIEW   = "view"
	CATEGORY_SOLE = "sole"
	CATEGORY_LAND = "land"
	CATEGORY_DATA = "data"
	CATEGORY_DAY = "day"
	CATEGORY_WEEK = "week"
	CATEGORY_MONTH = "month"
	CATEGORY_JOB  = "job"
	CATEGORY_POINT = "point"
	CAtEGORY_GUIDE = "guide"
)


func CategoryCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_CATEGORY);
}

func CategoryGet(db *mgo.Database, Id string) (r *models.Category , err error) {
	
	c := CategoryCollection(db)
	err = c.Find(bson.M{ "_id" : Id }).One(&r)
	
	return
}

func CategoryGetByCode(db *mgo.Database, Code string) (r *models.Category , err error){

	c := CategoryCollection(db)
	err = c.Find(bson.M{ "Code" : Code }).One(&r)
	
	return
}

func CategoryList(db *mgo.Database) (r []models.Category , err error) {

	c := CategoryCollection(db)
	err = c.Find(bson.M{}).All(&r)
	return
}

func CategoryInitializing(db *mgo.Database) (err error){
	
	c := CategoryCollection(db)
	
	w := int64(10000)
	
	b := [][]string {
	
		[]string {"本地楼市", CATEGORY_LOCAL},
		[]string {"专题报道", CATEGORY_SPECIAL},
		[]string {"各界声音", CATEGORY_LEADER},
		[]string {"独家探盘", CATEGORY_SOLE},
		[]string {"土地资讯", CATEGORY_LAND},
		[]string {"慧眼看楼", CATEGORY_VIEW},
		[]string {"楼市政策", CATEGORY_POLICY},
		[]string {"成交数据", CATEGORY_DATA},
		[]string {"日数据", CATEGORY_DAY},
		[]string {"周数据", CATEGORY_WEEK},
		[]string {"月数据", CATEGORY_MONTH},
		[]string {"地产招聘", CATEGORY_JOB},
		[]string {"业界观点", CATEGORY_POINT},
	}
	
	for _, k := range b {
		
		cat, _ := CategoryGetByCode(db, k[1])
		if cat == nil {
		
			ca := models.NewCategory(k[0], k[1])
			ca.Weight = models.NewInt64(*ca.Weight - w)
			c.Insert(ca)
		}
		
		w = w + 100
	}
	
	return
}