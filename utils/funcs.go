package utils

import (
	
	"fmt"
	"net/url"
	"reflect"
	"strconv"
	"strings"
	"html/template"
)

func Safe(a string) interface{} {

	return template.HTML(a)
}

func Upper(a string) string {
	return strings.ToUpper(a)
}

func Mod(a interface{}, b int64) int64 {
	
	if a == nil {
		panic("Nil value")
	}
	
	aa := reflect.ValueOf(a)
	
	if aa.Kind() == reflect.Ptr {
		aa = aa.Elem()
	}
	
	var v int64
	
	switch aa.Kind() {
	
	case reflect.Int:
		v = int64(a.(int))
	case reflect.Int32:
		v = int64(a.(int32))
	case reflect.Int16:
		v = int64(a.(int16))
	case reflect.Int64:
		v = int64(a.(int64))
	case reflect.String:
		var err error
		if v, err = strconv.ParseInt(aa.String(), 10, 64); err != nil {
			panic(fmt.Sprintf("invalid value to parse int %v" , a))
		}
	default:
		panic(fmt.Sprintf("invalid type for int %s" , aa.Kind()))
	}
	
	return v % b 
}

func Equals(a interface{}, b interface{}) bool {
	
	if a == nil && b == nil {
		return true
	}
	
	if a == nil || b == nil {
		return false;
	}
	
	aa := reflect.ValueOf(a)
	bb := reflect.ValueOf(b)
	
	if aa.Kind() == reflect.Ptr {
		aa = aa.Elem()
	}
	
	if bb.Kind() == reflect.Ptr{
		bb = bb.Elem()
	}
	
	if aa.Kind() != bb.Kind() {
		return false
	}
	
	return aa.Interface() == bb.Interface()
}

func Set(a map[string]interface{}, b string, c interface{}) string{
		
	a[b] = c
	return ""
}

func UnSet(a map[string]interface{}, b string) string{
		
	delete(a, b)
	return ""
}

func QueryE(path string, vs ...interface{}) bool {

	p, err := url.Parse(path)
	
	if err != nil {
		panic(fmt.Sprintf("Error path %v" , path))
	}
	
	vals := p.Query()
	
	if len(vs) > 0 {
	
		for i:=0;i<len(vs);i=i+2{
		
			key := vs[i].(string)
			val := vs[i+1]
			
			if key != "" {
			
				if val != nil {
					
					var v string
					vv := reflect.ValueOf(val);
					switch vv.Kind() {
						case reflect.Ptr:
							v = fmt.Sprintf("%v", vv.Elem().Interface())
						default:
							v = fmt.Sprintf("%v", val)
					}
					
					if vals.Get(key) == "" || vals.Get(key) != v {
						return false
					}
				}else{
					if vals.Get(key) != "" {
						return false
					}
				}
			}
		}
	}
	
	return true
}

func QueryN(path string, vs ...interface{}) string {

	p, err := url.Parse(path)
	
	if err != nil {
		panic(fmt.Sprintf("Error path %v" , path))
	}
	
	path = p.Path
	vals := p.Query()
	
	if len(vs) > 0 {
	
		for i:=0;i<len(vs);i=i+2{
		
			key := vs[i].(string)
			val := vs[i+1]
			
			if key != "" {
			
				delete(vals, key)
				if val != nil {
				
					vv := reflect.ValueOf(val);
					switch vv.Kind() {
						case reflect.Ptr:
							vals.Add(key, fmt.Sprintf("%v", vv.Elem().Interface()));
						default:
							vals.Add(key, fmt.Sprintf("%v", val));
					}
				}
			}
		}
	}
	
	query := vals.Encode()
	
	if query != "" {
		return path + "?" + query
	}
	
	return path
}

func Slice(a interface{} , s int, e int) interface{}{
	
	if a == nil { return [0]interface{}{} }
	
	aa := reflect.ValueOf(a)
	if aa.Kind() == reflect.Ptr {
		aa = aa.Elem()
	}
	
	
	ln := aa.Len()
	if ln == 0 {
		return [0]interface{}{}
	}
	
	if s < 0 {
		s = ln + s - 1
		e = s  + e
	}
	
	if s > ln -1 {
		return [0]interface{}{}
	}
	
	if e > ln {
		e = ln
	}
	
	return aa.Slice(s, e).Interface()
}

func In(a interface{}, b interface{}) bool{

	if a == nil || b == nil { return false }
	
	aa := reflect.ValueOf(a)
	if aa.Kind() == reflect.Ptr {
		aa = aa.Elem()
	}
	
	ln := aa.Len()
	if ln == 0 {
		return false
	}

	bb := reflect.ValueOf(b)
	if bb.Kind() == reflect.Ptr {
		bb = bb.Elem()
	}
	
	switch aa.Kind() {
	case reflect.String:
		
		if bb.Kind() != reflect.String {
			return false
		}
		
		return strings.Index(aa.Interface().(string) , bb.Interface().(string)) >= 0
		
	default:
		for i:=0 ; i<ln ; i=i+1 {
		
			if bb.Interface() == aa.Index(i).Interface() {
				return true
			}
		}
	}
	
	
	return false
}

func Join(a []string, b string) string{

	if a == nil {
		return ""
	}
	
	return strings.Join(a, b)
}
