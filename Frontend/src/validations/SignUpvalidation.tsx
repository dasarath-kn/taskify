import * as Yup from 'yup';
export const SignUpvalidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format').trim()
      .required('Email is required'),
    name: Yup.string().trim()
      .required('Name is required'),
    password: Yup.string().trim()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmpassword: Yup.string().trim()
      .min(6, 'Confirm Password must be at least 6 characters')
      .required('Confrim Password is required')
  });