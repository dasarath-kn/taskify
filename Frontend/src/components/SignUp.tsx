import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useFormik } from 'formik'
import { SignUpvalidationSchema } from '../validations/SignUpvalidation'
import { signUp } from '../api/userApi'

const SignUp = () => {
    let [showpassword, setShowpassword] = useState<boolean>(false)
  let passwordvisibility = () => {
    setShowpassword(!showpassword)
  }
  const navigate =useNavigate()
  const {errors,handleBlur,handleChange,handleSubmit,touched,resetForm} =useFormik({
    initialValues:{
        name:'',
        email:'',
        password:'',
        confirmpassword:''},
        validationSchema:SignUpvalidationSchema,
        onSubmit:async(Data)=>{
          if(Data.password ===Data.confirmpassword){
            const response = await signUp(Data)
          if(response?.data.success){            
            toast.success(response.data.message)
            resetForm()
            navigateLogin()
          }
          }else{
            toast.error("Password not matching")
 
          }
            
        }
    

  })
 function navigateLogin(){
  setTimeout(()=>{
    navigate('/login')
  },2000)
 }
  return (
<>
<div className='flex flex-col  lg:flex-row justify-center items-center min-h-screen p-4'>
   
   <div className='mt-8 lg:mt-0      w-full md:w-1/2 lg:w-1/3 h-auto lg: border shadow-xl flex flex-col p-8'>
   <span className="text-2xl  text-orange-500 font-extrabold mb-4">Taskify</span>
     <span className='text-2xl text-gray-400 font-semibold mb-4'> Login</span>
     <div className='flex flex-col'>
   <form onSubmit={handleSubmit}>
       <label className='font-medium mb-2 text-black'>Name:</label>
       <input name="name" onChange={handleChange} onBlur={handleBlur} type="text"  className='bg-white  w-full h-12 p-3 rounded-xl border-2  mb-4 text-black' placeholder="Enter name" />
       {errors.name && touched.name && <p className='text-sm text-red-500'>{errors.name}</p>}
       <label className='font-medium mb-2 text-black'>Email:</label>
       <input name="email" onChange={handleChange} onBlur={handleBlur} type="text"  className='bg-white  w-full h-12 p-3 rounded-xl border-2  mb-4 text-black' placeholder="Enter email" />
       {errors.email && touched.email && <p className='text-sm text-red-500'>{errors.email}</p>}

       <label className='font-medium mb-2 text-black'>Password:</label>
       <div className='relative'>
         <input name="password" onChange={handleChange} onBlur={handleBlur}   type={showpassword ? 'text' : 'password'} className='bg-white border-2 w-full h-12 p-3 rounded-xl text-black mb-4' placeholder='Enter password' />
         {errors.password && touched.password && <p className='text-sm text-red-500'>{errors.password}</p>}
         <div className='absolute right-3 top-3 cursor-pointer' onClick={passwordvisibility}>
           {showpassword ? <FaEyeSlash className='text-black' /> : < FaEye className='text-black' />}
         </div>
       </div>
       <label className='font-medium mb-2 text-black'>ConfirmPassword:</label>
       <div className='relative'>
         <input name="confirmpassword" onChange={handleChange} onBlur={handleBlur}   type={showpassword ? 'text' : 'password'} className='bg-white border-2 w-full h-12 p-3 rounded-xl text-black mb-4' placeholder='Enter confirm password' />
         {errors.confirmpassword && touched.confirmpassword && <p className='text-sm text-red-500'>{errors.confirmpassword}</p>}
         <div className='absolute right-3 top-3 cursor-pointer' onClick={passwordvisibility}>
           {showpassword ? <FaEyeSlash className='text-black' /> : < FaEye className='text-black' />}
         </div>
       </div>
       <button className='bg-orange-500 text-white border-2 font-medium w-full h-12  rounded-lg 'type='submit'>SignIn</button>
     </form>
      
     </div>
     <p>Already have an account ?<a  className='text-orange-500 cursor-pointer' onClick={()=>navigate('/login')}>SignIn</a></p>

    </div>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
 </div>
</>
)
}

export default SignUp