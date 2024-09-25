export interface User {
    name:string,
    email:string,
    password:string
}
export interface Task{
    _id?:string
    userId:string,
    taskname:string
    startdate:string,
    enddate:string,
    status?:string
}