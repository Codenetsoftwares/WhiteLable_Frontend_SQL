import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    userName: Yup.string()
        .min(2, 'userName must be at least 2 characters')
        .max(25, 'userName must not exceed 25 characters')
        .required('userName is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const CreateSubAdminSchema = Yup.object().shape({
    userName: Yup.string()
        .min(2, 'userName must be at least 2 characters')
        .max(25, 'userName must not exceed 25 characters')
        .required('userName is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});