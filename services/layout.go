package services

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"ftjx/models"
)


func LayoutCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_LAYOUT);
}

func LayoutGet(db *mgo.Database, Id string) (r *models.Layout , err error) {
	
	c := LayoutCollection(db)
	err = c.Find(bson.M{ "_id" : Id }).One(&r)
	
	return
} 

type LayoutStatus struct {

	Name  string
	Value int
	Count int
	
	Cover *models.Layout
	Heads []models.Layout
}

func LayoutStat(db *mgo.Database, rid string, Cover bool, Prefetch int) (ps []LayoutStatus, err error) {

	m := make(map[string]int)
	
	var k []models.Layout
	
	c := LayoutCollection(db)
	if err = c.Find(bson.M{"Rid" : rid}).Select(bson.M{"Type":1}).All(&k) ; err != nil {
		return
	}
	
	mm := KVs(db)["LayoutType"].Values
	nodes := KVs(db)["LayoutType"].Nodes

	for _, value := range k {
		
		if value.Type == nil {
			continue
		}
		
		typo := int(*value.Type)
		
		if name, ok := mm[typo] ; ok {
			
			if _, ok := m[name] ; !ok {
				m[name] = 0
			}
			
			m[name] = m[name] + 1
		}
	}
	
	ps = make([]LayoutStatus, 0, len(m))
	
	ps = append(ps, LayoutStatus {})
	
	for _, node := range nodes {
		
		k, v := node.Name, node.Value
		
		if m[k] > 0 {
			ps = append(ps, LayoutStatus { k, v.(int), m[k], nil, nil })
		}
	}
	
	ps[0].Name = "全部"
	ps[0].Value = 0
		
	for i:=1; i<len(ps); i=i+1 {
	
		ps[0].Count += ps[i].Count
		
		var a []models.Layout
		
		if Cover {
			if a, err = LayoutList(db, rid, int64(ps[i].Value), 1) ; err != nil {
				return
			}
			ps[i].Cover = &a[0]
		}
		
		if Prefetch > 0 {
			if a, err = LayoutList(db, rid, int64(ps[i].Value), Prefetch) ; err != nil {
				return
			}
			ps[i].Heads = a	
		}
	}
	
	return
}


func LayoutList(db *mgo.Database, rid string, typo int64, limit int) (r []models.Layout , err error) {

	c := LayoutCollection(db)
	
	q := bson.M{};
	
	if rid != "" {
		q["Rid"] = rid
	}
	
	if typo > 0 {
		q["Type"] = typo
	}
	
	cc := c.Find(q).Sort("_id")
	
	if limit > 0 {
		cc.Limit(limit)
	}
	
	err = cc.Sort("Type","_id").All(&r)
	
	return
}

type SLayoutPage struct {

	Page *Page
	Data []models.Layout
}

func LayoutPage(db *mgo.Database, limit int, page int, rid interface{}, typo int64) (p SLayoutPage , err error) {

	c := LayoutCollection(db)
	
	p.Page = &Page{}
	
	if err !=  nil {
		page = 1;
	}
	
	skip := page * limit - limit
	
	if skip < 0 {
		skip = 0
	}
	
	var r []models.Layout
	
	q := bson.M{ }
	
	if rid != ""{
		q["Rid"] = rid
	}
	
	if typo > 0 {
		q["Type"] = typo
	}
	
	cur := c.Find(q).Sort("_id")
	
	if p.Page.Count, err = cur.Count(); err != nil {
		return
	}
	
	cur.Skip(skip)
	
	if err = cur.Limit(limit).All(&r); err != nil {
		return
	}
	
	p.Page.From = skip
	p.Page.Size = limit
	p.Data = r
	
	return
}