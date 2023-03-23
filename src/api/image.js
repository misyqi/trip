import axios from "../services/index";

export function getImageList(id,page=1){
    return axios.get(`/image_class/${id}/image/${page}`)
}

export function updateImage(id,name){
    return axios.post(`/image/${id}`,{name})
}

export function deleteImage(ids){
    return axios.post(`/image/delete_all`,{ids})
}

export const uploadImageAction = '/api/image/upload'