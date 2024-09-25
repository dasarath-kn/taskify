import { useEffect, useState } from 'react';
import LineGraph from './LineGraph';
import PieChart from './PieChart';
import SideBar from './SideBar';
import { userData } from '../api/userApi';
import { User } from '../interface/userInterface';
import { useDispatch } from 'react-redux';
import { addDetails } from '../redux/userSlice';

const Dashboard = () => {
  const [userDatas,setUserDatas]=useState<User>()
  const dispatch =useDispatch()
  const [completed,setCompleted]=useState<Number>(0)
  const [pending,setPending]=useState<Number>(0)
  const [ongoing,setOngoing]=useState<Number>(0)
  const pieChartData = {
    labels: ['Completed', 'Ongoing', 'Pending'],
    datasets: [
      {
        data: [completed, ongoing, pending],
        backgroundColor: ['#abedb5', '#e9edab', '#edccab'],
        hoverBackgroundColor: ['#abedb5', '#e9edab', '#edccab'],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };
useEffect(()=>{
  const userDatas =async()=>{
    try {
      let response = await userData()
      if(response?.data){
        setUserDatas(response.data.userData)
        setCompleted(response.data.taskCompletedCount)
        setPending(response.data.taskPendingCount)
        setOngoing(response.data.taskOngoingCount)
        dispatch(addDetails(response.data.userData._id))
      }
    } catch (error) {
      console.error(error);
      
    }
  }
  userDatas()
},[])
console.log(completed,ongoing,pending);

  return (
    <div className="flex w-full min-h-screen">
      <SideBar />
      <div className="flex-grow flex flex-col p-4 bg-orange-50">
        <div className="w-full h-24 bg-gray-50 flex flex-col justify-center items-center mt-6 rounded-lg shadow-md">
          <p className="text-2xl font-semibold">Hello {userDatas?.name}!</p>
          <p>It's good to see you again</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-11">
          <div className="flex flex-col w-full sm:w-96 shadow-md justify-center items-center h-32 bg-yellow-50 p-4">
            <p className="text-3xl font-bold">{completed as number}</p>
            <p>Task completed</p>
          </div>
          <div className="flex flex-col w-full sm:w-96 shadow-md justify-center items-center h-32 bg-yellow-50 p-4">
            <p className="text-3xl font-bold">{ongoing as number}</p>
            <p>Task ongoing</p>
          </div>
          <div className="flex flex-col w-full sm:w-96 shadow-md justify-center items-center h-32 bg-yellow-50 p-4">
            <p className="text-3xl font-bold">{pending as number}</p>
            <p>Task pending</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row mt-11 space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="w-full lg:w-1/3 h-96 flex justify-center items-center">
            <PieChart data={pieChartData} options={pieChartOptions} />
          </div>
          <div className="w-full lg:w-1/3 h-96 flex justify-center items-center">
            <LineGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
