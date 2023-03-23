import axios from "../services/index";

export function getNoticeList(page){
    return axios.get(`/notice/${page}`)
}

export function createNotice(data){
    return axios.post("/notice",data)
}

export function updateNotice(id,data){
    return axios.post("/notice/",+id,data)
}

export function deleteNotice(id){
    return axios.post(`/notice/${id}/delete`)
}