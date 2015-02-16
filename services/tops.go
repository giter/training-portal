package services

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
			Value: 0,
			Name: "普通住宅",
		},
		TopUsage {
			Value: 1,
			Name: "花园洋房",
		},
		TopUsage {
			Value: 2,
			Name: "大平层",
		},
		TopUsage {
			Value: 3,
			Name: "别墅",
		},
		TopUsage {
			Value: 4,
			Name: "单身公寓",
		},
		TopUsage {
			Value: 5,
			Name: "LOFT",
		},
		TopUsage {
			Value: 6,
			Name: "写字楼",
		},
		TopUsage {
			Value: 7,
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

func Tops() *Top {
	
	return DefaultTops
}