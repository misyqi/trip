import axios from "../services/index";

export function getCategoryList(){
    return  axios.get("/category")
}