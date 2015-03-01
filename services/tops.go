package services

import (

	"reflect"
	"sync"
	"gopkg.in/mgo.v2"
)

type TopUsage struct {

	Id   string
	Value int
	Name string
}

type TopPrice struct {

	Id    string
	Name  string
	Value string
}

type TopFeature struct {

	Id    string
	Name  string
	Value string
}

type Top struct {
	
	Usages   []TopUsage
	Prices   []TopPrice
	Features []TopFeature
}

var DefaultTops = &Top{

	Usages :  []TopUsage{
		TopUsage {
			Value: 1,
			Name: "普通住宅",
		},
		TopUsage {
			Value: 2,
			Name: "花园洋房",
		},
		TopUsage {
			Value: 3,
			Name: "大平层",
		},
		TopUsage {
			Value: 4,
			Name: "别墅",
		},
		TopUsage {
			Value: 5,
			Name: "单身公寓",
		},
		TopUsage {
			Value: 6,
			Name: "LOFT",
		},
		TopUsage {
			Value: 7,
			Name: "写字楼",
		},
		TopUsage {
			Value: 8,
			Name: "商铺",
		},
	},
	Prices :  []TopPrice{
		TopPrice {
			Name  : "6千元以下",
			Value : "0,6000",
		},
		TopPrice {
			Name : "6千-7千元",
			Value : "6000,7000",
		},
		TopPrice {
			Name : "7千-8千元",
			Value : "7000,8000",
		},
		TopPrice {
			Name : "8千-9千元",
			Value : "8000,9000",
		},
		TopPrice {
			Name : "9千-1万元",
			Value : "9000,10000",
		},
		TopPrice {
			Name : "1万元以上",
			Value : "10000,999999",
		},
	},
	Features : []TopFeature{
		TopFeature {
			Name  : "刚需房",
			Value : "刚需房",
		},
		TopFeature {
			Name  : "改善房",
			Value : "改善房",
		},
		TopFeature {
			Name  : "团购房",
			Value : "团购房",
		},
		TopFeature {
			Name  : "学区房",
			Value : "学区房",
		},
		TopFeature {
			Name  : "精装修",
			Value : "精装修",
		},
		TopFeature {
			Name  : "现房",
			Value : "现房",
		},
		TopFeature {
			Name  : "养老地产",
			Value : "养老地产",
		},
		TopFeature {
			Name  : "投资地产",
			Value : "投资地产",
		},
	},
};

func Tops() (*Top, error) {
	
	return DefaultTops, nil
}

type Node struct {

	Name string
	Value interface{}
}

type NodeSet struct {
	
	Nodes []Node
	Names map[string] interface{}
	Values map[interface{}]string
}

func (n NodeSet) Name(val interface{}) string{
	
	vv := reflect.ValueOf(val)
	
	for vv.Kind() == reflect.Ptr {
		vv = vv.Elem()
	}
	
	switch vv.Kind() {
	
	case reflect.Int:
		if v, ok := n.Values[vv.Interface()]; ok {
			return v
		}
		
	case reflect.Int64:
	
		if v, ok := n.Values[int(vv.Interface().(int64))]; ok {
			return v
		}
	case reflect.String:
	
		if v, ok := n.Values[vv.Interface()]; ok {
			return v
		}
		
	default:
		panic("Unsupported Types!")
	}
	
	
	
	
	return ""
}

func NewNodeSet(v []Node) (n NodeSet) {

	n.Nodes = v
	n.Names = make(map[string] interface{}, len(v))
	n.Values = make(map[interface{}]string, len(v))
	
	for _,x := range v {
	
		n.Names[x.Name] = x.Value
		n.Values[x.Value] = x.Name
	}
	
	return
}

type KV map[string]NodeSet;

var DefaultKV KV

func defaultKV() KV {

	kv := KV {
	
		"RollType" : NewNodeSet([]Node {
			Node{"首页轮播",1},
			Node{"资讯首页轮播",2},
		}),
		
		//物业类型
		"Usage"    : NewNodeSet([]Node {
			Node{"普通住宅" , 1},
			Node{"花园洋房" , 2},
			Node{"大平层"   , 3},
			Node{"别墅"    , 4},
			Node{"单身公寓" , 5},
			Node{"LOFT"   , 6},
			Node{"写字楼"   , 7},
			Node{"商铺"    , 8},
		}),
		
		//销售状态
		"Schedule"  : NewNodeSet([]Node {
			Node{"待售" , 1},
			Node{"期房" , 2},
			Node{"现房" , 3},
			Node{"尾房" , 4},
			Node{"售完" , -1},
		}),
		
		"Floor"   : NewNodeSet([]Node {
			Node{"低层",  1},
			Node{"多层",  2},
			Node{"小高层", 3},
			Node{"高层"  , 4},
			Node{"超高层", 5},
		}),
		
		"PriceType" : NewNodeSet([]Node {
			Node{"起价", 1},
			Node{"均价", 2},
			Node{"总价", 3},
			Node{"待定", -1},
		}),
		
		"Price" : NewNodeSet([]Node {
			Node{"6千元以下", "0,6000"},
			Node{"6千-7千元", "6000,7000"},
			Node{"7千-8千元", "7000,8000"},
			Node{"8千-9千元", "8000,9000"},
			Node{"9千-1万元", "9000,10000"},
			Node{"1万元以上", "10000,0"},
		}),
		
		"Features": NewNodeSet([]Node {
			Node{"刚需房","刚需房"},
			Node{"改善房","改善房"},
			Node{"团购房","团购房"},
			Node{"学区房","学区房"},
			Node{"精装修","精装修"},
			Node{"现房","现房"},
			Node{"养老地产","养老地产"},
			Node{"投资地产","投资地产"},
		}),
		
		"PictureType": NewNodeSet([]Node {
			Node{"效果图",1},
			Node{"实景图",2},
			Node{"样板房",3},
			Node{"施工图",4},
			Node{"总平图",5},
			Node{"地理位置图",6},
		}),
						
	};
	
	return kv
}

var lock = &sync.Mutex{}

func KVs(db *mgo.Database) KV {

	if DefaultKV == nil {
		
		lock.Lock();
		
		DefaultKV = defaultKV()
		
		if Areas, err := AreaList(db) ; err == nil {
		
			areas := make([]Node, 0, 30)
			
			for _, v := range Areas {
				areas = append(areas, Node{ *v.Area, *v.Id });
			}
			
			DefaultKV["Area"] = NewNodeSet(areas);
		}else{
			panic("Error get arealist")
		}
		
		lock.Unlock();
	}
	
	return DefaultKV
}