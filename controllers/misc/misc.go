package misc

import (
	
	"os"
	"net/http"
	"math/rand"
	"strings"
	
	"github.com/martini-contrib/render"
	"github.com/martini-contrib/sessions"
	
	"verifycode"
)

var Wd, _ = os.Getwd()
var Fs = []string{ Wd + "/static/comic.ttf"}
var Fonts, _ = verifycode.NewFont(Fs)

const (

	CODES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
)

func Validation(w http.ResponseWriter, session sessions.Session, r render.Render) {
	
	s := make([]string, 4)
	
	for i := 0 ; i < 4 ; i ++  {
		n := rand.Intn(len(CODES));
		s[i] = CODES[n:n+1]
	}
	code := strings.Join(s, "")
	session.Set("code", code)
	
	c := []string{"#ffffffff"}
    colors, err := verifycode.NewColor(c)
    
    if err != nil {
    
        r.Error(500);
    	return
    }

    b := []string{"#62AB00FF"}
    backgrounds, err := verifycode.NewColor(b)
    
    if err != nil {
    
        r.Error(500);
    	return
    }
    
    verifyCode := verifycode.NewVerifyCode()
    verifyCode.SetColor(colors)
    verifyCode.SetBackground(backgrounds)
    verifyCode.SetFont(Fonts)
    verifyCode.SetWidthWithHeight(97, 40)
    verifyCode.SetFontSize(24)
    verifyCode.SetHinting(false)
    verifyCode.SetKerning(-6, 12)
	
	r.Header().Add("Content-Type", "image/png");
    
    if err = verifyCode.PNG(code, w); err != nil {
    
    	r.Error(500);
    	return
    }
    
}