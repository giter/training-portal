package forms

import (
	"mime/multipart"
)

type AjaxRequestState bool;

type JWS struct {
	
	Code int `json:"code"`
	Message string `json:"message"`
	Result interface{} `json:"result"`
}

func OK ( Result interface{} ) JWS{
	return JWS { 0, "", Result }
}

func Bad(Code int,  Message string ) JWS {
	return JWS{ Code, Message, nil }
}

type RealEstatePageForm struct {
	
	Page int `form:"p"`
	
	Usage int `form:"usage"`
	Floor int `form:"floor"`
	Letter string `form:"letter"`
	Schedule int `form:"schedule"`
	Feature string `form:"feature"`
	
	Price string `form:"price"`
	
	PriceType int `form:"pt"`
	
	Area  string `form:"area"`

}

type NewsForm struct { 

	Page int `form:"p"`
	
	Category string `form:"category"`
	Tag string `form:"tag"`
}

type ResourceForm struct {
	
	Resource *multipart.FileHeader `form:"Filedata"`
}

type LoginForm struct {
	
	UserName string `form:"username" binding:"required"`
	Password string `form:"password" binding:"required"`
	Remember bool `form:"remember"`
	Validate string `form:"validate"`
}

type AccountCheckForm struct {

	Account string `form:"username"`
	Mobile string `form:"mobile"`
	Email string `form:"email"`
	Validation string `form:"validation"`
}

type RegisterForm struct {

	Mobile string `form:"mobile" binding:"required"`
	Email string `form:"email" binding:"required"`
	Password string `form:"password" binding:"required"`
	
	Validation string `form:"validation" binding:"required"`
}
