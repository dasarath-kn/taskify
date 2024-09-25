import axiosInstance from "../configuration/axiosInstance";
import { User } from "../interface/userInterface";
const token =localStorage.getItem('UserToken')
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

export const userData =async()=>{
    try {
        const response = await axiosInstance.get('/userdata',{headers:{"Authorization":token}})
        return response
    } catch (error) {
        console.error(error);
 
    }
}
export const taskData =async()=>{
    try {
        const response = await axiosInstance.get('/taskdata',{headers:{"Authorization":token}})
        return response
    } catch (error) {
        console.error(error);
 
    }
}
export const changeStatus =async(taskId:string,status:string)=>{
    try {
        const data ={taskId:taskId,status:status}
        const response = await axiosInstance.put('/updatestatus',data,{headers:{"Authorization":token}})
        return response
    } catch (error) {
        console.error(error);
 
    }
}
export const completedTasks =async()=>{
    try {
        const response = await axiosInstance.get('/completedtasks',{headers:{"Authorization":token}})        
        return response
    } catch (error) {
        console.error(error);
 
    }
}