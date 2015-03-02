package user

import (
	
	"net/http"
	"strings"
	
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/sessions"
	log "github.com/alecthomas/log4go"
	
	"ftjx/utils"
	"ftjx/forms"
	"ftjx/services"
	"ftjx/models"
	
	
)


func RegisterCheck(db *mgo.Database, session sessions.Session, c forms.AccountCheckForm, r render.Render) {
	
	if c.Validation != ""{
	
		code := session.Get("code")
		if code != nil && !strings.EqualFold(code.(string), c.Validation) {
			r.JSON(200, "验证码错误，请重新输入")
			return
		}
	}

	if c.Email != "" {
	
		if ok, _ := services.UserCheckEmail(db, c.Email) ; !ok{
			r.JSON(200, "对不起，该邮箱已被注册。")
			return
		}
	}
	
	if c.Mobile != "" {
	
		if ok, _ := services.UserCheckMobile(db, c.Mobile) ; !ok{
			r.JSON(200, "对不起，该手机已被注册。")
			return
		}
	}
	
	if c.Account != "" {
	
		if ok, _ := services.UserCheckAccount(db, c.Account) ; !ok{
			r.JSON(200, "对不起，该用户名已被注册。")
			return
		}
	}
	
	r.JSON(200, true)
}

func Index(db *mgo.Database, ctx bson.M, r render.Render) {
	
	//var err error
	
	r.HTML(200, "user-index", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}

func Register(db *mgo.Database, ctx bson.M, r render.Render) {
	
	//var err error
	
	r.HTML(200, "user-register", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}

func UserRegister(db *mgo.Database, session sessions.Session, ajax forms.AjaxRequestState, form forms.RegisterForm, ctx bson.M, r render.Render) {

	var err error
	
	u := models.User {
	
		Id: models.NewString(utils.NewShortId()),
		Email: models.NewString(form.Email),
		Mobile: models.NewString(form.Mobile),
		Password: models.NewString(form.Password),
	}
	
	if err = services.UserRegister(db, u); err != nil {
	
		if ajax {
			r.JSON(200, forms.Bad(-1, "发生未知错误，注册失败！"))
			return
		} else {
			r.Error(500)
			return
		}
	}else{
	
		session.Set("uid", *u.Id)
		
		if ajax {
			r.JSON(200, forms.OK("/"))
			return
		} else {
			r.Redirect("/")
			return
		}
	}
}

func Login(db *mgo.Database, req *http.Request, ctx bson.M, r render.Render) {
	
	var err error
	
	ctx["Referer"] = req.Referer()
	
	if ctx["GroupbuyRecommends"], err = services.RealEstateGroupBuyRecommends(db, 3) ; err != nil {
		r.Error(500)
		return
	}

	r.HTML(200, "user-login", ctx, render.HTMLOptions{
		Layout: "layout",
	});
}

func UserLogin(db *mgo.Database, ajax forms.AjaxRequestState, req *http.Request, session sessions.Session, form forms.LoginForm, r render.Render) {

	var err error
	var user *models.User
	var refer string
	
	if user, err = services.UserLogin(db, form.UserName, form.Password); err != nil && err != mgo.ErrNotFound {
		
		log.Error(err)
		r.Error(500)
		return
	}
	
	if user != nil {
	
		session.Set("uid", *user.Id)
		
		refer = req.FormValue("referer")
		if refer == "" {
			refer = "/user/"
		}
	}
	
	if ajax {
		
		if user == nil {
			r.JSON(200, forms.Bad(-1, "用户名或密码错误"))
			return
		}
		
		r.JSON(200, forms.OK(refer))
		return
	}
	
	if user == nil {
		r.Redirect("/login.html", 302)
	}else{
		r.Redirect(refer, 302);
	}
}

func Logout(db *mgo.Database, session sessions.Session, r render.Render, req *http.Request) {

	session.Delete("uid")
	
	if req.Referer() != "" {
		r.Redirect(req.Referer(), 302);
	}else{
		r.Redirect("/user/", 302);
	}
	
	return
}
