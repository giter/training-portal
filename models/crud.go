package models

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type Q struct{
	
	query bson.M //QUERY
	fields *bson.M //FIELDS
	
	sorts []string //SORTS

	skip  int // SKIP
	limit int // LIMIT
	
	batchSize int; //BATCH
}

func NewQuery(q bson.M) (query *Q) {
	
	query = new(Q)
	query.query = q
	return
}

func (q *Q) Skip(n int) *Q{

	q.skip = n;
	return q
}

func (q *Q) Limit(n int) *Q{

	q.limit = n
	return q
}

func (q *Q) BatchSize(n int) *Q{

	q.batchSize = n
	return q
}

func (q *Q) Sorts(s ...string) *Q{
	
	q.sorts = s
	return q
}

func (q *Q) Query(c *mgo.Collection) *mgo.Query{
	
	it := c.Find(q.query)
	
	if q.skip > 0 {
		it.Skip(q.skip)
	}
	
	if q.limit > 0 {
		it.Limit(q.limit)
	}
	
	if q.batchSize > 0 {
		it.Batch(q.batchSize);
	}
	
	if q.sorts != nil && len(q.sorts) > 0 {
		it.Sort(q.sorts ...)
	}
	
	if q.fields != nil && len(*q.fields) > 0 {
		it.Select(q.fields);
	}
	
	return it
}