import axios from "axios";


export const baseurl = axios.create({
    baseURL:"https://sasansocialapi.herokuapp.com/api/"
});