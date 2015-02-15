package main

import (

	"time"
	"html/template"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/gzip"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/sessions"
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
	
	funcMap := template.FuncMap{
	
		"eqs": func(a *string, b *string) bool {
		
			if a == nil && b == nil {
				return true
			}
			
			if a == nil && b != nil {
				return false
			}
			
			if a != nil && b == nil {
				return false
			}
			
			return *a == *b
		},
    }
    
    funcMap["set"] = (func(a map[string]interface{}, b string, c interface{}) string{
		
		a[b] = c
		return ""
	})
    
	m.Use(render.Renderer(render.Options{
		Layout: "manage-layout",
		Funcs: []template.FuncMap{funcMap},
	}))
	
	store := sessions.NewCookieStore([]byte("ftjx"));
	
	m.Use(sessions.Sessions("ftjx", store))
	m.Use(martini.Static("static"))

	controllers.Managements(m)
	controllers.Index(m);
	controllers.NewHouse(m);
	
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
