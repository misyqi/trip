import axios from "../services/index";
import { queryParams } from '../utils/utils'


export function getGoodsList(page,query={}){
    let r = queryParams(query)
    return axios.get(`/goods/${page}${r}`)
}


export function updateGoodsStatus(ids,status){
    return axios.post(`/goods/${ids}/changestatus`,{
        status
    })

}

export function createGoods(data){
    return axios.post('/goods',data)
}
export function updateGoods(id,data){
    return axios.post(`/goods/${id}`,data)
}
export function deleteGoods(ids){
    return axios.post(`/goods/delete_all`,{
        ids
    })
}

export function readGoods(id){
    return axios.get(`/goods/read/${id}`)
}

export function setGoodsBanner(id,data){
    return axios.post(`/goods/banners/${id}`,data)
}

export function updateGoodsSkus(id,data){
    return axios.post(`/goods/updateskus/${id}`,data)
}

export function createGoodsSkusCard(data){
    return axios.post(`/admin/goods_skus_card`,data)
}
 

export function updateGoodsSkusCard(id,data){
    return axios.post(`/goods_skus_card/${id}`,data)
}

export function deleteGoodsSkusCard(id){
    return axios.post(`/goods_skus_card/${id}/delete`)
}

export function sortGoodsSkusCard(data){
    return axios.post(`/goods_skus_card/sort`,data)
}

export function createGoodsSkusCardValue(data){
    return axios.post(`/goods_skus_card_value`,data)
}

export function updateGoodsSkusCardValue(id,data){
    return axios.post(`/goods_skus_card_value/${id}`,data)
}

export function deleteGoodsSkusCardValue(id){
    return axios.post(`/goods_skus_card_value/${id}/delete`)
}

export function chooseAndSetGoodsSkusCard(id,data){
    return axios.post(`/goods_skus_card/${id}/set`,data)
}

