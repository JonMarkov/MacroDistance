//图片上传
import Vue from 'vue'
import list from './list'
import listst from './listTuijian'
import shop from './shop'
import share from './share'
const lists = {
    install: () => {
		Vue.component('lists',list)
    }
}
const listss = {
    install: () => {
		Vue.component('listss',listst)
    }
}
const shops = {
    install: () => {
		Vue.component('shops',shop)
    }
}
const shares = {
    install: () => {
		Vue.component('shares',share)
    }
}
export { 
	lists,shops,shares,listss
}
