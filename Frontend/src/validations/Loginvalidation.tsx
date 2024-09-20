import * as Yup from 'yup';
export const LoginvalidationSchema = Yup.object().shape({
    email: Yup.string().trim()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().trim()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });