package main

import (

	"fmt"
	"time"
	"net/http"
	"bufio"
	"net"
	"html/template"
	"strings"
	"math/rand"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/gzip"
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/sessions"
	
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"

	"ftjx/controllers"
	"ftjx/forms"
	"ftjx/models"
	"ftjx/services"
	"ftjx/utils"
)

var UPTIME = time.Now().Format("200601021504")

func main() {

	rand.Seed(time.Now().UnixNano())
	
	m := martini.Classic()

	m.Use(gzip.All())
	
	m.Use(func (w http.ResponseWriter, r *http.Request, c martini.Context) {
		
		if ! (strings.HasSuffix(r.URL.Path, "/") || strings.HasSuffix(r.URL.Path, ".html") ) {
			return
		}
		
		gzw := LineWriter{ 
			bufio.NewWriterSize(w, 4096),
			w.(martini.ResponseWriter),
		}
		
		defer gzw.w.Flush()
		
		c.MapTo(gzw, (*http.ResponseWriter)(nil))
		c.Next()
		
		gzw.Header().Del("Content-Length")
	})

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
	funcMap["queryE"]  = utils.QueryE;
	funcMap["queryN"] = utils.QueryN;
	funcMap["slice"]  = utils.Slice;
	funcMap["mod"]  = utils.Mod;
	funcMap["in"]  = utils.In;
	funcMap["upper"] = utils.Upper;
	funcMap["join"]  = utils.Join;
	funcMap["safe"]  = utils.Safe;
    
	m.Use(render.Renderer(render.Options{
		Layout: "",
		Funcs: []template.FuncMap{ funcMap },
	}))
	
	store := sessions.NewCookieStore([]byte("jiaxing zendor"));
	
	m.Use(martini.Static("static"))
	
	
	
	m.Use(sessions.Sessions("FTU", store))
	
	m.Use(func (ctx martini.Context, r *http.Request) {
		
		v := bson.M{}
		
		CONTEXT := bson.M{}
		
		CONTEXT["URL"] = r.URL;
		CONTEXT["UPTIME"] = UPTIME
		CONTEXT["KVs"]    = services.KVs(db)
		
		v["CONTEXT"] = CONTEXT
		
		ctx.Map(v)
		
		ctx.Map(forms.AjaxRequestState(r.Header.Get("x-requested-with") != ""))
		
		ctx.Next()
		
	})
	
	m.Use(func (db *mgo.Database, CONTEXT bson.M, ctx martini.Context, r render.Render, session sessions.Session, req *http.Request) {
		
		uid := session.Get("uid")
		
		if uid != nil {
			
			fmt.Println(uid)
			
			u, _ := services.UserGet(db, uid.(string))
			
			if u != nil {
				ctx.Map(u);
				CONTEXT = CONTEXT["CONTEXT"].(bson.M)
				CONTEXT["USER"] = u
			}
		}
		
		if strings.HasPrefix(req.RequestURI, "/user/") {
			
			if uid == nil {
			
				r.Redirect("/login.html", 302);
				return
			}
		}
		
		ctx.Next();
	});
	

	controllers.Managements(m)
	controllers.Index(m);
	controllers.NewHouse(m);
	controllers.News(m);
	controllers.GroupBuy(m);
	controllers.User(m);
	controllers.Misc(m);
	
	m.Run()
}

func indexing(db *mgo.Database) (err error) {
	
	c := db.C(models.COLLECTION_AREA);
	
	if err = c.EnsureIndexKey("City", "Area"); err != nil {
		panic(err)
	}
	
	u := db.C(models.COLLECTION_USER);
	
	if err = u.EnsureIndex(mgo.Index{Key : []string {"Account"},Unique: true}); err != nil {
		panic(err)
	}
	
	if err = u.EnsureIndex(mgo.Index{Key : []string {"Email"},Unique: true}); err != nil {
		panic(err)
	}
	
	if err = u.EnsureIndex(mgo.Index{Key : []string {"Mobile"},Unique: true}); err != nil {
		panic(err)
	}
	
	return
}

func initializing(db *mgo.Database) (err error) {
	
	services.AreaInitializing(db);
	services.CategoryInitializing(db);
	
	return
}


type LineWriter struct {

	w *bufio.Writer
	martini.ResponseWriter
};

func IsWhitespace( b byte ) bool {
	return b == '\r' || b == '\n' || b == '\t' || b == ' '
}

func (grw LineWriter) Write(p []byte) (n int, e error) {
	
	if len(p) == 0 {
		return
	}
	
	m := make([]byte, 0, len(p))
	
	m = append(m, p[0])
	
	for i, n := 1, len(p) ; i < n ; i=i+1 {
		if IsWhitespace(p[i]) && IsWhitespace(p[i-1]) { continue }
		m = append(m, p[i])
	}
	
	return grw.w.Write(m)
}

func (grw LineWriter) Hijack() (net.Conn, *bufio.ReadWriter, error) {

	hijacker, ok := grw.ResponseWriter.(http.Hijacker)
	
	if !ok {
		return nil, nil, fmt.Errorf("the ResponseWriter doesn't support the Hijacker interface")
	}
	
	return hijacker.Hijack()
}
