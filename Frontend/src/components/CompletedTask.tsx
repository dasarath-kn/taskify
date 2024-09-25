import SideBar from './SideBar'
import Completed from './Completed'
import { useEffect, useState } from 'react'
import { completedTasks } from '../api/userApi'
import { Task } from '../interface/userInterface'
import Socket from '../configuration/Socket'
import toast, { Toaster } from 'react-hot-toast'
interface TaskEventData {
    message: string;
    taskId?: string; 
  }
const CompletedTask = () => {
    const [tasks,setTasks]=useState<Task[]>([])
    useEffect(()=>{
        const completed =async()=>{
            try {
                const response = await completedTasks()
                if(response?.data.success){
                    setTasks(response.data.completedTasks)  
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        completed()
    },[])
    useEffect(()=>{
        const handleTaskDeleted=({message}:TaskEventData)=>{
          
            toast.success(message)

        }
        Socket.on("task_deleted",handleTaskDeleted)
        return ()=>{
            Socket.off("task_deleted", handleTaskDeleted);
   
        }
    },[])
    const handleDelete = async(taskId:string)=>{
        try {
            Socket.emit('delete',taskId)
            let data= tasks.filter((val)=> val._id?.toString()!== taskId?.toString())            
            setTasks(data)
            
        } catch (error) {
            console.error(error);
            
        }
    }
  return (
    <div>
        <div className="flex w-full min-h-screen">
            <SideBar />
            <div className="w-5/6 flex flex-col items-center p-16">
                <div className="w-full h-24 bg-green-300 flex justify-between items-center p-4 rounded-lg shadow-md">
                    <div>
                        <p className="text-lg text-black font-semibold">Completed Task</p>
                        <p className="text-sm">All completed tasks</p>
                    </div>
                    <div className="flex items-center">
                    </div>
                </div>
                <div className="w-full mt-4">
                    <Completed taskData={tasks}deleteTask={handleDelete}/>
                </div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
        
        </div> 
    </div>
  )
}

export default CompletedTask
