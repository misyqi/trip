import axios from "../services/index";

export function getRoleList(page){
    return axios.get(`/role/${page}`)
}

export function createRole(data){
    return axios.post("/role",data)
}

export function updateRole(id,data){
    return axios.post("/role/",+id,data)
}

export function deleteRole(id){
    return axios.post(`/role/${id}/delete`)
}
export function updateRoleStatus(id,status){
    return axios.get(`/role/${id}/update_status`,{
        status
    })
}
export function setRoleRules(id,rule_ids){
    return axios.post(`/role/set_rules`,{
        id,rule_ids
    })
}