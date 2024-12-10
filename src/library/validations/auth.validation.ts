import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
    fullName: yup
        .string()
        .required('Vui lòng nhập họ tên')
        .min(3, 'Họ tên phải có ít nhất 3 ký tự'),
    email: yup
        .string()
        .required('Vui lòng nhập email')
        .email('Email không hợp lệ')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email không hợp lệ'),
    password: yup
        .string()
        .required('Vui lòng nhập mật khẩu')
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    phone: yup
        .string()
        .required('Vui lòng nhập số điện thoại')
        .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ'),
    address: yup
        .string()
        .required('Vui lòng nhập địa chỉ')
        .min(5, 'Địa chỉ phải có ít nhất 5 ký tự'),
});
export type SignUpSchema = yup.InferType<typeof signUpSchema>;