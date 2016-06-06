package services

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"time"
	"ftjx/models"
	"ftjx/forms"
)


func NewsCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_NEWS);
}

func NewsGet(db *mgo.Database, Id string) (r *models.News , err error) {
	
	c := NewsCollection(db)
	err = c.Find(bson.M{ "_id" : Id }).One(&r)
	
	return
} 

func NewsList(db *mgo.Database) (r []models.News , err error) {

	c := NewsCollection(db)
	err = c.Find(bson.M{ "Status.Disabled" : bson.M{ "$ne" : true } }).Sort("-Time", "-_id").All(&r)
	return
}

type SNewsPage struct {

	Page *Page
	Data []models.News
}

func NewsPage(db *mgo.Database, query forms.NewsForm) (p SNewsPage, err error) {

	c := NewsCollection(db)
	
	p.Page = &Page{}
	
	limit := 12
	skip := query.Page * limit - limit
	
	if skip < 0 {
		skip = 0
	}
	
	var r []models.News
	
	q := bson.M{ }
	q["Status.Disabled"] = bson.M{ "$ne" : true };
	q["Time"] = bson.M{"$lte" : time.Now().Unix()}
	
	if query.Category != "" {
		q["Category.Name"] = query.Category
	}
	
	if query.Tag != "" {
		q["Tags"] = query.Tag
	}
	
	if query.Newhouse != "" {
		q["RealEstate"] = query.Newhouse
	}
	
	cur := c.Find(q).Sort("-Time", "-_id")
	
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

//资讯首页头条
func NewsHeadlines(db *mgo.Database) (r []models.News , err error) {

	c := NewsCollection(db)
	
	Count := 2
	
	q := bson.M{ }
	q["Status.Disabled"] = bson.M{ "$ne" : true };
	q["Status.Indexed"] = true
	q["Time"] = bson.M{"$lte" : time.Now().Unix()}
	
	err = c.Find(q).Sort("-Time", "-_id").Limit(Count).All(&r)
	return
}

func NewsRecommends(db *mgo.Database, Count int) (r []models.News , err error) {

	c := NewsCollection(db)
	
	q := bson.M{ }
	q["Status.Disabled"] = bson.M{ "$ne" : true };
	q["Status.Recommended"] = true
	q["Time"] = bson.M{"$lte" : time.Now().Unix()}
	
	err = c.Find(q).Sort("-Time", "-_id").Limit(Count).All(&r)
	return
	
}

func NewsListByCode(db *mgo.Database, Code string , Count int) (r []models.News , err error) {
	
	c := NewsCollection(db)
	
	q := bson.M{ }
	q["Status.Disabled"] = bson.M{ "$ne" : true };
	q["Category.Code"] = Code
	q["Time"] = bson.M{"$lte" : time.Now().Unix()}
	
	err = c.Find(q).Sort("-Time", "-_id").Limit(Count).All(&r)
	return
}