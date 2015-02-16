package utils

import (
	
	"fmt"
	"net/url"
	"reflect"
)

func Equals(a *string, b *string) bool {
		
	if a == nil && b == nil {
		return true
	}
	
	if a == nil && b != nil {
		return false
	}
	
	if a != nil && b == nil {
		return false
	}
	
	return *a == *b
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
	
	if query != "" {
		return path + "?" + query
	}
	
	return path
}