import axios from "../services/index";

export function getCategoryList(){
    return  axios.get("/category")
}

export function createCategory(data){
    return axios.get(`/category`,data)
}
export function updateCategory(id,data){
    return axios.get(`/category/`+id,data)
}

export function updateCategoryStatus(id,status){
    return axios.post(`/category/${id}/update_status`,{
        status
    })
}
export function deleteCategory(id){
    return axios.post(`/category/${id}/delete`)
}

export function getCategoryGoods(id){
    return  axios.get(`/app_category_item/list?category_id=${id}`)
}

export function deleteCategoryGoods(id){
    return  axios.post(`/app_category_item/${id}/delete`)
}

export function connectCategoryGoods(data){
    return  axios.post(`/app_category_item`,data)
}


