import { FaHome, FaPlus, FaCheckCircle, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom';
const SideBar = () => {
    const navigate =useNavigate()
    const handleLogout =()=>{
        localStorage.removeItem('UserToken')
        navigate('/login')

    }
  return (
    <div className="min-h-screen w-72 bg-orange-500 rounded-xl flex flex-col justify-between">
      <div className="w-full h-40 flex justify-center items-center">
        <p className="text-3xl font-bold text-white">Taskify.</p>
      </div>

      <div className="flex-grow flex justify-center">
        <ul className="text-xl font-semibold text-white space-y-8 mt-6 w-full px-8">
          <li onClick={()=>navigate('/dashboard')} className="flex items-center space-x-4 cursor-pointer hover:text-orange-300">
            <FaHome />
            <span>Dashboard</span>
          </li>
          <li onClick={()=>navigate('/addtask')} className="flex items-center space-x-4 cursor-pointer hover:text-orange-300">
            <FaPlus />
            <span>Add Task</span>
          </li>
          <li onClick={()=>navigate('/completed')}  className="flex items-center space-x-4 cursor-pointer hover:text-orange-300">
            <FaCheckCircle />
            <span>Completed Task</span>
          </li>
        </ul>
      </div>
      <div className="w-full flex justify-center py-4">
        <button onClick={handleLogout} className="text-xl font-semibold text-white flex items-center space-x-2 hover:text-orange-300">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
