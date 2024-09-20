import { FaPlus } from 'react-icons/fa'
import SideBar from './SideBar'
import Table from './Tables'
import { useState } from 'react'
import { useFormik } from 'formik'
import { TaskvalidationSchema } from '../validations/Taskvalidation'

const AddTask = () => {
    const [modal, setModal] = useState<boolean>(false)
    const { handleChange,touched, errors,handleSubmit,handleReset } = useFormik({
        initialValues: {
            taskname: "",
            startdate: "",
            enddate: "",
        },validationSchema:TaskvalidationSchema,onSubmit:(Data)=>{
            console.log(Data);
            
        }
    })
    return (
        <div className="flex w-full min-h-screen">
            <SideBar />
            <div className="w-5/6 flex flex-col items-center p-16">
                <div className="w-full h-24 bg-gray-300 flex justify-between items-center p-4 rounded-lg shadow-md">
                    <div>
                        <p className="text-lg font-semibold">Create Task</p>
                        <p className="text-sm">Create a new task</p>
                    </div>
                    <div className="flex items-center">
                        <FaPlus onClick={()=>setModal(!modal)} className="text-2xl text-gray-700 cursor-pointer" />
                    </div>
                </div>
                <div className="w-full mt-4">
                    <Table />
                </div>
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
                                    <textarea  onChange={handleChange} name="taskname" id="taskname"  className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter taskname" />
                                    { touched.taskname &&errors.taskname && <p className="text-red-500 text-sm">{errors.taskname}</p>}
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
                                        <label className="block mb-2 text-sm font-medium text-black">Joined Date</label>
                                        <input type='date'  onChange={handleChange} name="startdate" id="startdate" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter duration" />
                                        {touched.startdate && errors.startdate && <p className="text-red-500 text-sm">{errors.startdate}</p>}
                                    </div>
                                
                              
                    <div className="sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-black">End Date</label>
                      <input type='date'  onChange={handleChange} name="enddate" id="enddate" className="border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter duration" />
                      {touched.enddate &&errors.enddate && <p className="text-red-500 text-sm">{errors.enddate}</p>}
                    </div>
                            </div>
                            <button type="submit"  className="text-white inline-flex items-center bg-orange-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
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
