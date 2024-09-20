import * as Yup from 'yup';
const currentDate = new Date().toISOString().split('T')[0]; 
export const TaskvalidationSchema = Yup.object().shape({
    taskname: Yup.string().trim().required('Task name is required'),
    startdate: Yup.date()
      .min(currentDate, 'Start date cannot be in the past')
      .required('Start date is required'),
    enddate: Yup.date()
      .min(Yup.ref('startdate'), 'End date cannot be before the start date')
      .required('End date is required'),
  });