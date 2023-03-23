import axios from "../services/index";

export function getCouponList(page){
    return axios.get(`/coupon/${page}`)
}

export function createCoupon(data){
    return axios.post("/coupon",data)
}

export function updateCoupon(id,data){
    return axios.post("/coupon/",+id,data)
}

export function deleteCoupon(id){
    return axios.post(`/coupon/${id}/delete`)
}
export function updateCouponStatus(id){
    return axios.post(`coupon/${id}/update_status`,{status:0})
}