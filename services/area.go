package services

import (
	
	"time"
	
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"ftjx/models"
)


func AreaCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_AREA);
}

func AreaGet(db *mgo.Database, Id string) (r *models.Area , err error) {
	
	c := AreaCollection(db)
	err = c.Find(bson.M{ "_id" : Id }).One(&r)
	
	return
} 

func AreaList(db *mgo.Database) (r []models.Area , err error) {

	c := AreaCollection(db)
	err = c.Find(bson.M{ "City" : "嘉兴" }).Sort("Weight", "_id").All(&r)
	return
}

func AreaInitializing(db *mgo.Database) (err error){
	
	c := AreaCollection(db)
	
	city := "嘉兴"
	areas := [...]string{
		"中心城区", "南湖新区", "秀洲新区", 
		"城北区", "国际商务区", "湘家荡度假区", 
		"嘉善", "海宁", "海盐", "平湖", "桐乡",
	}
	
	i := int64(100)
	var n int
	for _, area := range areas {
		
		n, err = c.Find(bson.M{"City":city, "Area": area}).Limit(1).Count();
		
		if err != nil {
			panic(err)
		}
		
		if n == 0 {
		
			area := models.Area{
				Id: models.NewString(bson.NewObjectId().Hex()),
				City: &city, 
				Area: &area,
				Weight: models.NewInt64(i),
				MTime: &models.MTime {
					Created : models.NewInt64(time.Now().Unix()),
					Changed : models.NewInt64(time.Now().Unix()),
				},
			}
			
			err = c.Insert(area)
			
			if err != nil {
			
				panic(err)
			}
		}
		
		i = i + 100
	}
	
	return
}