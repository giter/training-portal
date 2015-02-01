package main

import (

	"time"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/gzip"
	"github.com/martini-contrib/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"

	"ftjx/controllers"
	"ftjx/models"
)

func main() {

	m := martini.Classic()

	m.Use(gzip.All())

	session, err := mgo.Dial("127.0.0.1")
	db := session.DB("FCCS")
	
	indexing(db)
	initializing(db)

	if err != nil {
		panic("No Database Connection!")
	}

	m.Map(session)
	m.Map(db)

	m.Use(render.Renderer(render.Options{
		Layout: "manage-layout",
	}))

	m.Use(martini.Static("static"))

	controllers.Managements(m)
	/*
		m.Get("/(index\\.html?)?", func(db *mgo.Database, r render.Render) {

			ctx := bson.M{}
			c := db.C("links")

			// f := models.NewLink("房产网站","房产超市2","http://www.baidu.com");
			// links.Upsert(c, f)

			q := services.NewQuery(bson.M{})
			q.Limit(24).Sorts("weight", "_id")
			ctx["Links"], _ = links.List(c, q)
			r.HTML(200, "index", ctx)
		})
	*/
	m.Run()
}

func indexing(db *mgo.Database) (err error) {
	
	c := db.C(models.COLLECTION_AREA);
	
	if err = c.EnsureIndexKey("City", "Area"); err != nil {
		panic(err)
	}
	
	return
}

func initializing(db *mgo.Database) (err error) {
	
	c := db.C(models.COLLECTION_AREA);
	
	city := "嘉兴"
	areas := [...]string{
		"中心城区", "南湖新区", "秀洲新区", "城西区", 
		"城北区", "西南区", "国际商务区", "城南区", 
		"湘家荡度假区", "嘉善", "海宁", "海盐", "平湖", "桐乡"}
	
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
