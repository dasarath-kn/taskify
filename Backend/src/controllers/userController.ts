import { Request, Response } from "express";
import UserModel from "../models/userModel";
import { jwtToken } from "../configure/jwt";
import { User } from "../interface/userInterface";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const userData: User | null = await UserModel.findOne({ email: email, password: password })
        const token = await jwtToken(userData?._id as string)        
        if (userData) {
            res.status(200).json({ success: true, message: "Userdata sent successfully", userData,token })
        }else if(!userData){
            res.status(200).json({ success: false, message: "User not found" })
 
        }
         else {
            res.status(400).json({ success: false, message: "Failed to sent userdata" })
        }

    } catch (error) {
        console.error(error);

    }
}

export const signUp = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        console.log(req.body, "ppp");
        let findUser = await UserModel.findOne({ email: email, password: password })
        if (!findUser) {
            const userData = { name, email, password }
            let saveUser = new UserModel(userData)
            let saved = await saveUser.save()
            if (saved) {
                res.status(200).json({ success: true, message: "Signup completed" })
            } else {
                res.status(400).json({ success: false, message: "Failed to save userdata" })
            }
        } else {
            res.status(200).json({ success: true, message: "User already exist" })

        }

    } catch (error) {
        console.error(error);

    }
}