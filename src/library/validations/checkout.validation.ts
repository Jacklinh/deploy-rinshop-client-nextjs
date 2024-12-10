import * as yup from 'yup';

export const checkoutSchema = yup.object().shape({
    // Các trường bắt buộc cho khách chưa đăng nhập
    fullName: yup.string().when('$isAuthenticated', {
        is: false,
        then: () => yup.string().required('Vui lòng nhập họ tên'),
        otherwise: () => yup.string().optional(),
    }),
    email: yup.string().when('$isAuthenticated', {
        is: false,
        then: () => yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        otherwise: () => yup.string().optional(),
    }),
    phone: yup.string().when('$isAuthenticated', {
        is: false,
        then: () => yup.string().required('Vui lòng nhập số điện thoại'),
        otherwise: () => yup.string().optional(),
    }),
    password: yup.string().when('$isAuthenticated', {
        is: false,
        then: () => yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
        otherwise: () => yup.string().optional(),
    }),
    address: yup.string().when('$isAuthenticated', {
        is: false,
        then: () => yup.string().required('Vui lòng nhập địa chỉ'),
        otherwise: () => yup.string().optional(),
    }),
    // Các trường chung
    shipping_address: yup.string().optional(), // Địa chỉ giao hàng khác (optional)
    tracking_number: yup.string().optional(), // Số điện thoại giao hàng khác (optional)
    payment_type: yup.number().required('Vui lòng chọn phương thức thanh toán'),
    shipping_fee: yup.number().required('Vui lòng chọn phương thức vận chuyển'),
    note: yup.string().optional(),
});
export type checkoutSchema = yup.InferType<typeof checkoutSchema>;