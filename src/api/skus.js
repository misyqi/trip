import axios from "../services/index";

export function getSkusList(page){
    return axios.get(`/skus/${page}`)
}

export function createSkus(data){
    return axios.post("/skus",data)
}

export function updateSkus(id,data){
    return axios.post("/skus/"+id,data)
}

export function deleteSkus(ids){
    ids = !Array.isArray(ids) ? [ids] : ids
    return axios.post(`/skus/delete_all`,{ ids })
}

export function updateSkusStatus(id,status){
    return axios.post(`/skus/${id}/update_status`,{
        status
    })
}