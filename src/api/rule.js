import axios from "../services/index";

export function getRuleList(page){
    return axios.get(`/rule/${page}`)
}

export function createRule(data){
    return axios.get(`/rule`,data)
}
export function updateRule(id,data){
    return axios.get(`/rule/`+id,data)
}

export function updateRuleStatus(id,status){
    return axios.get(`/rule/${id}/update_status`,{
        status
    })
}
export function deleteRule(id){
    return axios.get(`/rule/${id}/delete`)
}
