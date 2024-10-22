import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
interface props{
  datas:Number[]
}
const LineGraph:React.FC<props> = ({datas}) => {
  const [completedCount,setCompletedCount]=useState<Number[]>([])
useEffect(()=>{
  setCompletedCount(datas)
},[datas])
  const data = [
    { name: 'Jan', value: completedCount[0] },
    { name: 'Feb', value: completedCount[1] },
    { name: 'Mar', value: completedCount[2] },
    { name: 'Apr', value: completedCount[3] },
    { name: 'May', value: completedCount[4] },
    { name: 'Jun', value: completedCount[5] },
    { name: 'Jul', value: completedCount[6] },
    { name: 'Aug', value: completedCount[7] },
    { name: 'Sep', value: completedCount[8] },
    { name: 'Oct', value: completedCount[9] },
    { name: 'Nov', value: completedCount[10] },
    { name: 'Dec', value: completedCount[11] },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
