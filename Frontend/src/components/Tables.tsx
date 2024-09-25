import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"
import { Task } from "../interface/userInterface";
interface TableProps {
  datas: Task[];
  updateStatus:(taskId:string,status:string)=>void 
  deleteTask:(taskId:string)=>void 
  editTask:(data:Task)=>void 
}
const Table:React.FC<TableProps> = ({datas,updateStatus,deleteTask,editTask}) => {
  const [taskDatas, setTaskDatas] = useState<Task[]>(datas);

    useEffect(() => {
      setTaskDatas(datas);
    }, [datas]);
    
  
    return (
        <>

<div className="relative overflow-x-auto">
  <table className="min-w-full text-sm text-left text-black">
    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
      <tr>
        <th scope="col" className="px-4 py-2">
          Task Name
        </th>
        <th scope="col" className="px-4 py-2">
          Start Date
        </th>
        <th scope="col" className="px-4 py-2">
          End Date
        </th>
        <th scope="col" className="px-4 py-2">
          Status
        </th>
        <th scope="col" className="px-4 py-2">
          Action
        </th>
        <th scope="col" className="px-4 py-2">
         Manage
        </th>
      </tr>
    </thead>
    <tbody>
     {taskDatas&& taskDatas.map((val)=>{
     return( <>
      <tr key={val.taskname} className="bg-white border-b text-black hover:bg-gray-100 transition-colors">
        <th scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
          {val.taskname}
        </th>
        <td className="px-4 py-2">
         {val.startdate}
        </td>
        <td className="px-4 py-2">
         {val.enddate}
        </td>
        <td className="px-4 py-2">
          <span className="font-semibold">{val.status}</span>
        </td>
        <td className="px-4 py-2">
          <select name="status" value={val.status} onChange={(e)=>{updateStatus(val._id as string, e.target.value)}} id="status-dropdown" className="p-1 border rounded-md">
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Pending">Pending</option>
          </select>
        </td>
        <td className="px-6 py-4 flex space-x-6">
              <button onClick={()=>editTask(val)} className="flex items-center text-blue-600 hover:underline">
                <FaEdit className="mr-1" /> Edit
              </button>
              <button onClick={()=>deleteTask(val._id as string)} className="flex items-center text-red-600 hover:underline">
                <FaTrash className="mr-1" /> Delete
              </button>
            </td>
      </tr></>)})}
    </tbody>
  </table>
</div>


        </>
    )
}

export default Table