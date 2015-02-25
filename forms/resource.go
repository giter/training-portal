package forms

import (
	"mime/multipart"
)

type ResourceForm struct {
	
	Resource *multipart.FileHeader `form:"Filedata"`
}