package main

import (

	"time"
	"net/http"
	"html/template"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/gzip"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/sessions"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"

	"ftjx/controllers"
	"ftjx/models"
	"ftjx/utils"
)

var UPTIME = time.Now().Format("200601021504")

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
	
	funcMap := template.FuncMap{}
    
    funcMap["equals"] = utils.Equals
    funcMap["set"] = utils.Set
	funcMap["unset"] = utils.UnSet
	funcMap["query"] = utils.Query;
	funcMap["queryN"] = utils.QueryN;
    
	m.Use(render.Renderer(render.Options{
		Layout: "",
		Funcs: []template.FuncMap{ funcMap },
	}))
	
	store := sessions.NewCookieStore([]byte("ftjx"));
	
	m.Use(sessions.Sessions("ftjx", store))
	m.Use(martini.Static("static"))
	m.Use(func (ctx martini.Context, r *http.Request) {
		
		
		v := bson.M{}
		
		SERVER := bson.M{}
		SERVER["URL"] = r.URL;
		SERVER["UPTIME"] = UPTIME
		
		v["CONTEXT"] = SERVER
		
		ctx.Map(v)
		ctx.Next()
	})

	controllers.Managements(m)
	controllers.Index(m);
	controllers.NewHouse(m);
	controllers.News(m);
	controllers.GroupBuy(m);
	
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
