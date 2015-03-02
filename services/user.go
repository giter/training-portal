package services

import (

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"ftjx/models"
)


func UserCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_USER);
}

func UserGet(db *mgo.Database, Id string) (r *models.User , err error) {
	
	c := UserCollection(db)
	err = c.Find(bson.M{ "_id" : Id }).One(&r)
	
	return
}

func UserRegister(db *mgo.Database, u models.User) (err error) {

	c := UserCollection(db)
	return c.Insert(&u)
}

func UserCheckAccount(db *mgo.Database, UserName string) (valid bool, err error) {
	
	c := UserCollection(db)
	
	var r *models.User
	err = c.Find(bson.M{ "Account" : UserName }).One(&r)
	valid = r == nil
	
	return
}

func UserCheckEmail(db *mgo.Database, Email string) (valid bool, err error) {
	
	c := UserCollection(db)
	
	var r *models.User
	err = c.Find(bson.M{ "Email" : Email }).One(&r)
	valid = r == nil
	
	return
}

func UserCheckMobile(db *mgo.Database, Mobile string) (valid bool, err error) {
	
	c := UserCollection(db)
	
	var r *models.User
	err = c.Find(bson.M{ "Mobile" : Mobile }).One(&r)
	valid = r == nil
	
	return
}

func UserLogin(db *mgo.Database, UserName string, Password string) (r *models.User , err error) {
	
	c := UserCollection(db)
	
	pwd := models.EncodePassword(Password)
	
	err = c.Find(bson.M{ "Password":pwd, "Status.Disabled": bson.M{ "$ne" : true }, "Account" : UserName }).One(&r)
	if err != nil && err != mgo.ErrNotFound  || r != nil { return }
	
	err = c.Find(bson.M{ "Password":pwd, "Status.Disabled": bson.M{ "$ne" : true }, "Email" : UserName }).One(&r)
	if err != nil && err != mgo.ErrNotFound  || r != nil { return }
	
	err = c.Find(bson.M{ "Password":pwd, "Status.Disabled": bson.M{ "$ne" : true }, "Mobile" : UserName }).One(&r)
	if err != nil && err != mgo.ErrNotFound || r != nil { return }
	
	return
}

func UserList(db *mgo.Database) (r []models.User , err error) {

	c := UserCollection(db)
	err = c.Find(bson.M{}).All(&r)
	return
}
