package services

import (

)

type Page struct {

	From int
	Size int
	Count int
}

func (p Page) Current() int {
	
	if p.Size == 0 {
		return 0
	}
	
	return p.From / p.Size + 1 
}

func (p Page) Next() int {
	
	if p.Current() == p.Last() { return 0 }
	
	return p.Current() + 1
}

func (p Page) Previous() int {

	if p.Current() <= 1 { return 0 }
	
	return p.Current() + 1
}

func (p Page) Last() int {

	if p.Size == 0 { return 0 }
	
	return (p.Count+p.Size-1) / p.Size
}

func (p Page) List() []int {

	r := make([]int, 0, 15)
	
	if p.Last() < 10 {
	
		//小于10页，无论如何全显示
		for i := 1; i <= p.Last() ; i=i+1 {
			r = append(r, i)
		}
	} else if p.Current() < 8 {
		
		//当前小于第8页，无论如何全显示
		for i := 1; i <= 8 ; i=i+1 {
			r = append(r, i)
		}
		
		r = append(r, 0)
		r = append(r, p.Last())
	} else {
		
		//显示当前页前后三页，越界时特殊处理
		r = append(r, 1)
		r = append(r, 0)
		for i := p.Current() - 3; i < p.Current() + 4 ; i=i+1 {
			if i <= p.Last() {
				r = append(r, i)
			}
		}
		
		if p.Current() + 4 - 1 < p.Last() {
			r = append(r, 0)
			r = append(r, p.Last())
		}
	}
	
	return r
}
