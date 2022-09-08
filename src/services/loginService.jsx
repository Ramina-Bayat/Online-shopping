import http from "./httpService";

export const loginUser =(data)=>{
    return http.post('/user/login',data);//axios.post("")

}