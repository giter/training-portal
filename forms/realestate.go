package forms

import (
)

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
