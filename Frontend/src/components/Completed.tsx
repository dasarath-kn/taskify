import React from 'react'
import { FaTrash } from 'react-icons/fa'

const Completed = () => {
  return (
   
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
         Manage
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-white border-b text-black hover:bg-green-100 transition-colors">
        <th scope="row" className="px-4 py-2 font-medium whitespace-nowrap">
          Study JS
        </th>
        <td className="px-4 py-2">
          12/09/22
        </td>
        <td className="px-4 py-2">
          12/09/22
        </td>
        <td className="px-4 py-2">
          <span className="font-semibold">Completed</span>
        </td>
       
        <td className="px-6 py-4 ">
              
              <button className="flex items-center text-red-600 hover:underline">
                <FaTrash className="mr-1" /> Delete
              </button>
            </td>
      </tr>
    </tbody>
  </table>
</div>
  )
}

export default Completed
