package manage

import (

	"os"
	"time"
	"strings"
	"io"
	"mime/multipart"

	"gopkg.in/mgo.v2"
	"github.com/martini-contrib/render"
	
	"github.com/nfnt/resize"
	
	"image"
	"image/jpeg"
	
	"ftjx/forms"
	"ftjx/models"
	"ftjx/utils"
)

const (
	MAX_UPLOAD_SIZE = 32 * 1024 * 1024
	DIR_PREFIX      = "./static"
	DIR_TYPE        = "2006/2006-01/2006-01-02"
)

func ResourceCollection(db *mgo.Database) *mgo.Collection {
	
	return db.C(models.COLLECTION_RESOURCE);
}

func ResourceResize(db *mgo.Database, Resource *models.Resource, width uint) (r *models.Resource, err error) {
	
	var fs *os.File
	var img image.Image
	
	if fs, err = os.Open(DIR_PREFIX + *Resource.Path) ; err != nil {
		return
	}
	
	defer fs.Close()
	
	if  img , _ , err = image.Decode(fs) ; err != nil {
		return
	}

	m := resize.Resize(width, 0, img, resize.Lanczos3)
	
	
	c := ResourceCollection(db)
	
	suffix := ".jpg"
	dir := "/upload/"+time.Now().Format(DIR_TYPE)
	fn  := utils.NewShortId()
	
	file := dir + "/" + fn + suffix
	
	var fd *os.File
	
	if err = os.MkdirAll(DIR_PREFIX + dir, os.ModeDir) ; err != nil {
		return;
	}
	
	if fd, err = os.Create(DIR_PREFIX + file); err != nil {
		return;
	}
	
	defer fd.Close()
	
	if err = jpeg.Encode(fd, m, nil) ; err != nil{
		return
	}
	
	if err = fd.Sync(); err != nil{
		return 
	}
	
	var stat os.FileInfo
	
	if stat, err = fd.Stat(); err != nil {
		return 
	}
	
	r = &models.Resource{
		Id   : models.NewString(fn), 
		MIME : models.NewString("image/jpeg"), 
		Path : models.NewString(file),
		Size : models.NewInt64(stat.Size()),
		Name : Resource.Name,
	}
	
	c.Insert(r)
	
	return
}

func ResourceUpload(db *mgo.Database, res forms.ResourceForm, r render.Render) {
	
	var err error
	
	if res.Resource == nil {
		r.Error(403);
		return;
	}
	
	filename := res.Resource.Filename
	suffix := res.Resource.Filename
	
	idx := strings.LastIndex(suffix, ".")
	if idx > 0 {
		suffix = suffix[idx:]
		filename = filename[0:idx]
	}else {
		suffix = "";
	}
	
	dir := "/upload/"+time.Now().Format(DIR_TYPE)
	fn  := utils.NewShortId()
	
	
	var fd *os.File
	var fs multipart.File
	var size int64
	
	if fs, err = res.Resource.Open() ; err != nil {
		r.Error(500);
		return;
	}
	
	if size, err = fs.Seek(0, os.SEEK_END); err != nil {
		r.Error(500);
		return;
	} else if size > MAX_UPLOAD_SIZE {
		r.Error(500);
		return;
	} 
	
	if _, err = fs.Seek(0, os.SEEK_SET); err != nil {
		r.Error(500);
		return;
	}
	
	if err = os.MkdirAll(DIR_PREFIX + dir, os.ModeDir) ; err != nil {
	
		r.Error(500);
		return;
	}
	
	file := dir + "/" + fn + suffix
	
	if fd, err = os.Create(DIR_PREFIX + file); err != nil {
	
		r.Error(500);
		return;
	}
	
	defer fs.Close()
	defer fd.Close()
	
	if _, err = io.Copy(fd, fs); err != nil {
	
		r.Error(500);
		return;
	}
	
	resource := models.Resource{
		Id   : models.NewString(fn), 
		MIME : models.NewString(res.Resource.Header.Get("Content-Type")), 
		Path : models.NewString(file),
		Size : models.NewInt64(size),
		Name : models.NewString(filename),
	}
	
	ResourceCollection(db).Insert(resource)
	r.JSON(200, resource);
}