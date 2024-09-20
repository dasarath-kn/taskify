import axiosInstance from "../configuration/axiosInstance";
import { User } from "../interface/userInterface";

export const login =async(data:User)=>{
    try {
        const response = await axiosInstance.post('/login',data)
        return response
    } catch (error) {
        console.error(error);
        
    }
}

export const signUp =async(userData:User)=>{
    try {
        const response = await axiosInstance.post('/signup',userData)
       console.log(response.data);
       
        return response
    } catch (error) {
        console.error(error);

    }
}