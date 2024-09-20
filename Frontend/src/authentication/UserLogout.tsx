import { Navigate, Outlet } from "react-router-dom"

const userToken =Boolean(localStorage.getItem("UserToken"))
const UserLogout:React.FC = ()=>{
   return userToken?<Outlet/>:<Navigate to='/login'/>
}
export default UserLogout   