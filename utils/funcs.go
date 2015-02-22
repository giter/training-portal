package utils

import (
	
	"fmt"
	"net/url"
	"reflect"
	"strconv"
	"strings"
)

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

func Query(path string, a map[string]interface{}) string {
	
	return QueryN(path, a, "", nil)
}

func QueryN(path string, a map[string]interface{}, key string, val interface{}) string {

	vals := url.Values{}
	
	for k, v := range a {
		
		if v == nil {
		
			delete(vals, k)
		} else{
		
			vv := reflect.ValueOf(val);
			
			switch vv.Kind() {
				case reflect.Ptr:
					vals.Add(k, fmt.Sprintf("%v", vv.Elem().Interface()));
				default:
					vals.Add(k, fmt.Sprintf("%v", v));
			}
		}
	}
	
	if key != "" {
		
		if val == nil {
			delete(vals, key)
		}else{
		
			vv := reflect.ValueOf(val);
			switch vv.Kind() {
				case reflect.Ptr:
					vals.Add(key, fmt.Sprintf("%v", vv.Elem().Interface()));
				default:
					vals.Add(key, fmt.Sprintf("%v", val));
			}
		}
	}
	
	query := vals.Encode()
	
	return strings.Join([]string{path, query}, "?")
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
	
	for i:=0 ; i<ln ; i=i+1 {
	
		if bb.Interface() == aa.Index(i).Interface() {
			return true
		}
	}
	
	return false
}
