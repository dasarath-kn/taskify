import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import  UserLogin  from '../authentication/Userlogin'
import UserLogout from '../authentication/UserLogout'
import DashboardPage from '../pages/DashboardPage'
import AddTaskPage from '../pages/AddTaskPage'
import TaskCompletedPage from '../pages/TaskCompletedPage'

const UserRoute = () => {
  return (
    <>
    <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/addtask' element={<AddTaskPage/>}/>
        <Route path='/completed' element={<TaskCompletedPage/>}/>
    </Routes>
    </>
  )
}

export default UserRoute
