package manage

import (
	
	"strconv"
	"reflect"
	"net/http"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/martini-contrib/render"
	
	"ftjx/services"
)

func Index(page string) func(db *mgo.Database, ctx bson.M, r render.Render) {

	return (func(db *mgo.Database, ctx bson.M, r render.Render){
		r.HTML(200, page, ctx, render.HTMLOptions{
			Layout: "manage-layout", 
		});
	});
}

/*
	@param c 目标数据
	@param m 初始查询条件
*/
func List(c *mgo.Collection, req *http.Request, r render.Render, m bson.M, retriever func(*mgo.Query) (interface{},error) ) {
	
	var total, cnt int
	
	err := req.ParseForm();
	if err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	action := req.FormValue("action");
	
	switch action {
	case "delete":
	
		ids := req.Form["id[]"]
		if len(ids) > 0 {
			dels := bson.M{ "_id": bson.M{"$in": ids} }
			if _, err = c.RemoveAll(dels); err!= nil {
				r.JSON(500, err.Error())
			}
		}
	case "disable":
	
		ids := req.Form["id[]"];
		strDisable := req.FormValue("value")
		if len(ids) > 0 && strDisable != ""{
			
			var disable bool
			disable, err = strconv.ParseBool(strDisable)
			
			if err == nil {
				diss := bson.M{ "_id": bson.M{"$in": ids} }
				_, err = c.UpdateAll(diss, bson.M{"$set" : bson.M{"Status.Disabled" : disable, }, });
			}
		}
		
	case "index":
		ids := req.Form["id[]"];
		strIndex := req.FormValue("value")
		if len(ids) > 0 && strIndex != ""{
			
			var index bool
			index, err = strconv.ParseBool(strIndex)
			
			if err == nil {
				indxs := bson.M{ "_id": bson.M{"$in": ids} }
				_, err = c.UpdateAll(indxs, bson.M{"$set" : bson.M{"Status.Indexed" : index, }, });
			}
		}
	case "recommend":
		ids := req.Form["id[]"];
		strRecommend := req.FormValue("value")
		if len(ids) > 0 && strRecommend != ""{
			
			var value bool
			value, err = strconv.ParseBool(strRecommend)
			
			if err == nil {
				indxs := bson.M{ "_id": bson.M{"$in": ids} }
				_, err = c.UpdateAll(indxs, bson.M{"$set" : bson.M{"Status.Recommended" : value, }, });
			}
		}
	}
	
	if err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	q := services.NewQuery(m)
	
	start := req.FormValue("start")
	if start != "" {
		if v, err := strconv.ParseInt(start, 0, 32) ; err == nil{
			q.Skip(int(v))
		}
	}
	
	length := req.FormValue("length")
	if v, err := strconv.ParseInt(length, 0, 32) ; err == nil{
		q.Limit(int(v))
	}

	q.Sorts("weight","_id");
	
	if total, err = c.Count() ; err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	iter := q.Query(c)
	var rs interface{}
	
	if rs, err = retriever(iter) ; err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	iter.Limit(0).Skip(0)
	if cnt, err = iter.Count() ; err != nil {
		r.JSON(500, err.Error())
		return
	}
	
	v := reflect.ValueOf(rs)
	if v.IsNil() {
		rs = make([]int,0);
	}
	
	//{"data":[],"draw":0,"recordsTotal":2430,"recordsFiltered":2430}
	r.JSON(200, bson.M{
	
		"recordsTotal": total, 
		"recordsFiltered": cnt,
		"data": rs,
	});
}