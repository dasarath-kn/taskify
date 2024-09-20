import Jwt  from "jsonwebtoken";
const secretKey ="2456987"
export const jwtToken = async(user_id:string)=>{
    try {
        const payload ={user_id:user_id}
        const token = Jwt.sign(payload,secretKey,{expiresIn:'1d'})
        return token
    } catch (error) {
        console.error("Failed to generate token");
        
    }
}