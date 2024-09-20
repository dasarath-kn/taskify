    import mongoose from "mongoose";
    const url ="mongodb://0.0.0.0.:27017/taskmanagement"
    const connectDB = async()=>{
        try {            
            const connect = await mongoose.connect(url)
            if(connect){
                console.log("Database connected successfully");
                
            }else{
                console.log("Failed to connect database");
                
            }
        } catch (error:any) {
            console.error(error.message);
            
        }
    }

    export default connectDB