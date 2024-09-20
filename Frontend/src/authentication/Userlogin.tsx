import { Navigate, Outlet } from "react-router-dom"

let userToken = Boolean(localStorage.getItem("UserToken"))
const UserLogin:React.FC = ()=>{
   return userToken?<Navigate to="/dashboard"/>:<Outlet/>
}
export default UserLogin