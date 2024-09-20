import SideBar from './SideBar'
import Completed from './Completed'

const CompletedTask = () => {
  return (
    <div>
        <div className="flex w-full min-h-screen">
            <SideBar />
            <div className="w-5/6 flex flex-col items-center p-16">
                <div className="w-full h-24 bg-green-300 flex justify-between items-center p-4 rounded-lg shadow-md">
                    <div>
                        <p className="text-lg text-black font-semibold">Completed Task</p>
                        <p className="text-sm">All completed tasks</p>
                    </div>
                    <div className="flex items-center">
                    </div>
                </div>
                <div className="w-full mt-4">
                    <Completed />
                </div>
            </div>
        
        </div> 
    </div>
  )
}

export default CompletedTask
