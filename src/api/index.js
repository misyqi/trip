import axios from "../services/index";

export function getStatistics1(){
    return axios.get("/statistics1")
}

export function getStatistics2(type){
    return axios.get("/statistics2")
}

export function getStatistics3(type){
    return axios.get("/statistics3?type="+type)
}