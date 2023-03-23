import axios from "../services/index";
import { queryParams } from '../utils/utils'

export function login(username,password){
    return axios.post("/login",{
        username,
        password
    }
    )
}
export function getinfo(){
    return axios.post("/getinfo")
}
export function logout(){
    return axios.post('/logout')
}
export function updatepassword(){
    return axios.post('/updatepassword',data)
}

export function getManagerList(page,query={}){
    
    let r = queryParams(query)
    return axios.get(`/manager/${page}${r}`)
}


export function updateManagerStatus(id,status){
    return axios.post(`/manager/${id}/update_status`,{
        status
    })

}

export function createManager(data){
    return axios.post('/manager',data)
}
export function updateManager(id,data){
    return axios.post(`/manager/${id}`,data)
}
export function deleteManager(id){
    return axios.post(`/manager/${id}/delete`)
}


