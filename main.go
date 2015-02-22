package main

import (

	"time"
	"net/http"
	"html/template"

	"github.com/go-martini/martini"
	// "github.com/martini-contrib/gzip"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/sessions"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"

	"ftjx/controllers"
	"ftjx/models"
	"ftjx/services"
	"ftjx/utils"
)

var UPTIME = time.Now().Format("200601021504")

func main() {

	m := martini.Classic()

	// m.Use(gzip.All())

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
    funcMap["set"]    = utils.Set
	funcMap["unset"]  = utils.UnSet
	funcMap["query"]  = utils.Query;
	funcMap["queryN"] = utils.QueryN;
	funcMap["slice"]  = utils.Slice;
	funcMap["mod"]  = utils.Mod;
	funcMap["in"]  = utils.In;
    
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
		SERVER["KVs"]    = services.KVs()
		
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
	
	services.AreaInitializing(db);
	services.CategoryInitializing(db);
	
	return
}
