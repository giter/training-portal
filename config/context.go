package config

import (

	"gopkg.in/mgo.v2"
)

type Context struct {

	db *mgo.Database
}

var DefaultCtx = & Context{}

