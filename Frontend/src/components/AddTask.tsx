import { FaPlus } from 'react-icons/fa'
import SideBar from './SideBar'
import Table from './Tables'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { TaskvalidationSchema } from '../validations/Taskvalidation'
import socket from '../configuration/Socket'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/Store'
import toast, { Toaster } from 'react-hot-toast'
import { changeStatus, taskData } from '../api/userApi'
import { Task } from '../interface/userInterface'
interface TaskEventData {
    message: string;
    taskId?: string; 
  }
const AddTask = () => {
    
    const [modal, setModal] = useState<boolean>(false)
    const [taskDatas,setTaskDatas]=useState<Task[]>([])
    const [selectedTask,setSelectedTask]=useState<Task>()
    const [updated,setUpdated]=useState<boolean>(false)
    const userId = useSelector((state: RootState) => state.user.userId)
    const id = localStorage.getItem('id')
    const { handleChange, touched, errors, handleSubmit, resetForm,values } = useFormik({
        enableReinitialize:true,
        initialValues: {
            taskname:selectedTask?.taskname||"",
            startdate:selectedTask?.startdate||"",
            enddate: selectedTask?.enddate||"",
        }, validationSchema: TaskvalidationSchema, onSubmit: async (Data) => {
           if(!selectedTask){
            socket.emit("task", Data, id)
            setModal(!modal)
            setUpdated(!updated)
            resetForm()

        }else{
            socket.emit('edit',selectedTask._id,Data,id)
            setModal(!modal)
            setUpdated(!updated)
           }
            
        }
    })
    useEffect(() => {
        const handleTaskAdded =({message}:TaskEventData)=>{           
            toast.success(message)
        }
        const handleTaskDeleted=({message}:TaskEventData)=>{
           
            toast.success(message)

        }
        const handleTaskEdited =({message}:TaskEventData)=>{
            toast.success(message)
            
        }
        socket.on("task_added",handleTaskAdded )
        socket.on("task_deleted",handleTaskDeleted)
        socket.on("task_edited",handleTaskEdited)

        return () => {    
            socket.off("task_added", handleTaskAdded);
            socket.off("task_deleted", handleTaskDeleted);
            socket.off("task_edited",handleTaskEdited)
        };

    
    },[])
    useEffect(()=>{
        const tasks =async()=>{
            try {
                const response = await taskData()
                if(response?.data.success){
                    setTaskDatas(response?.data.taskData)
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        tasks()
    },[updated,socket])
    const handleStatus =async(taskId:string,status:string)=>{
       try {
        const response = await changeStatus(taskId,status)
          if(response?.data.success){
            if(status !=="Completed"){
                const updatedTasks = taskDatas.map((val) => {
                    if (val._id === taskId) {
                        return { ...val, status };
                    }
                    return val; 
                });
                setTaskDatas(updatedTasks)
            }else{
                const updatedTasks = taskDatas.filter((val)=> val.status?.toString() !=="Completed".toString())                
                setTaskDatas(updatedTasks)
                setUpdated(!updated)
            }
          }
         
       } catch (error) {
        console.error(error);
        
       }
      
    
    }
    const handleDelete = async(taskId:string)=>{
        try {
            socket.emit('delete',taskId)
             let data= taskDatas.filter((val)=> val._id?.toString()!== taskId?.toString())
            setTaskDatas(data)
        } catch (error) {
            
        }
    }
    const handleedit = async(data:Task)=>{
        try {
            setModal(!modal)
            setSelectedTask(data)

            
        } catch (error) {
         console.error(error);
            
        }
    }
    
    return (
        <div className="flex w-full min-h-screen">
             <SideBar />
            <div className="w-5/6 flex flex-col items-center p-16">
                <div className="w-full h-auto bg-gray-300 flex flex-col md:flex-row justify-between items-center p-4 rounded-lg shadow-md space-y-4 md:space-y-0">
                    <div className="flex flex-col items-start">
                        <p className="text-lg font-semibold">Create Task</p>
                        <p className="text-sm">Create a new task</p>
                    </div>

                    <div className="flex-grow flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 px-4 md:space-x-4">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="w-full max-w-md p-2 border border-gray-400 rounded-md"
                        />
                        <button
                            className="text-orange-500 border-2 border-orange-500 px-4 py-2 rounded-md w-full md:w-auto">
                            Search
                        </button>
                    </div>

                    <div className="flex items-center">
                        <FaPlus onClick={() => {setModal(!modal),setSelectedTask(undefined)}} className="text-2xl text-gray-700 cursor-pointer" />
                    </div>
                </div>


                <div className="w-full mt-4">
                    <Table datas={taskDatas}updateStatus={handleStatus}deleteTask={handleDelete}editTask={handleedit} />
                </div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            {modal && <div id="crud-modal" aria-hidden="true" className="bg-black bg-opacity-60 flex justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold dark:text-black">
                                Create task
                            </h3>
                            <button onClick={() => setModal(!modal)} type="button" className="text-gray-400 bg-transparent hover:bg-black hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5" onSubmit={handleSubmit} >
                            <div className="grid gap-4 mb-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block mb-2 text-sm font-medium text-black">Task name</label>
                                    <textarea onChange={handleChange} value={values.taskname} name="taskname" id="taskname" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter taskname" />
                                    {touched.taskname && errors.taskname && <p className="text-red-500 text-sm">{errors.taskname}</p>}
                                </div>
                                {/* <div className="sm:col-span-1">
                                    <label className="block mb-2 text-sm font-medium text-black">Duration</label>
                                    <select onChange={handleChange} name="status" id="status" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value="">Select</option>
                                        <option value="completed">Completed</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                                </div> */}

                                <div className="sm:col-span-1">
                                    <label className="block mb-2 text-sm font-medium text-black">Start Date</label>
                                    <input type='date' onChange={handleChange}  value={values.startdate} name="startdate" id="startdate" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter duration" />
                                    {touched.startdate && errors.startdate && <p className="text-red-500 text-sm">{errors.startdate}</p>}
                                </div>


                                <div className="sm:col-span-1">
                                    <label className="block mb-2 text-sm font-medium text-black">End Date</label>
                                    <input type='date' onChange={handleChange} value={values.enddate} name="enddate" id="enddate" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter duration" />
                                    {touched.enddate && errors.enddate && <p className="text-red-500 text-sm">{errors.enddate}</p>}
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-orange-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>}
        </div>

    )
}

export default AddTask
