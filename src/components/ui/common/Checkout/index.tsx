'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageWithFallback from '../ImageWithFallback'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { axiosClient } from '@/library/axiosClient';
import { globalSetting } from '@/constanst/configs';
import useAuth from '@/hooks/useAuth';
import {useCart} from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatPrice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { checkoutSchema } from '@/library/validations/checkout.validation';
const CheckoutComponent = () => {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const {products, totalAmount, shippingFee, setShippingFee ,clearCart} = useCart();
    const [loading, setLoading] = useState(false);
    const [paymentType, setPaymentType] = useState<number>(1);
	const { register, handleSubmit, formState: { errors }, setValue } = useForm<checkoutSchema>({
		resolver: yupResolver(checkoutSchema),
        defaultValues: {
            payment_type: 1,
            shipping_fee: shippingFee,
            // Nếu đã đăng nhập thì set các giá trị mặc định từ user
            ...(isAuthenticated && user && {
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                address: user.address,
            })
        }
	});
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);
    const handleShippingFee = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingFee(parseInt(e.target.value))
        setValue('shipping_fee', parseInt(e.target.value))
    }
    const handlePaymentType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentType(parseInt(e.target.value))
        setValue('payment_type', parseInt(e.target.value))
    }
    const onSubmit = async (data: checkoutSchema) => {
        if (products.length === 0) {
            alert('Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng!');
            return;
        }
    
        setLoading(true);
        try {
            // Chuẩn bị order items
            const orderItems = products.map((item) => ({
                product: {
                    _id: item._id,
                    product_name: item.product_name,
                    thumbnail: item.thumbnail,
                },
                product_name: item.product_name,
                quantity: item.quantity,
                price: item.price,
                discount: item.discount || 0,
            }));
    
            // Chuẩn bị dữ liệu đơn hàng
            const orderData = {
                payment_type: paymentType,
                shipping_fee: shippingFee,
                order_items: orderItems,
                shipping_address: data.shipping_address || user?.address || '',
                tracking_number: data.tracking_number || user?.phone || '',
                note: data.note || '',
                total_amount: totalAmount + shippingFee,
                customer: isAuthenticated && user ? user._id : {
                    fullName: data.fullName,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    address: data.address
                }
            };
            const response = await axiosClient.post(
                `${globalSetting.URL_API}/orders/checkout`,
                orderData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
    
            if (response.status === 201 || response.status === 200) {
                clearCart();
                if (isAuthenticated) {
                    const confirm = window.confirm('Đặt hàng thành công! Bạn có muốn theo dõi đơn hàng(ok) hoặc về trang chủ(cancel)');
                    if (confirm) {
                        router.push('/profile/orders');
                    } else {
                        router.push('/');
                    }
                } else {
                    const confirm = window.confirm('Đặt hàng thành công! Bạn có muốn đăng nhập(ok) hoặc về trang chủ(cancel)');
                    if (confirm) {
                        router.push('/login');
                    } else {
                        router.push('/');
                    }
                }
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

  return (
    <section className="sec_checkout">
            <div className="container mx-auto py-8">
                <div className="box_checkout">
                    <div className="article_use">
                        {/* Form đặt hàng */}
                        <div className="article_form">
                            <h2 className="sec_heading">Thông tin đặt hàng</h2>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                {user && isAuthenticated ? (
                                    <>
                                        <table className='table-fixed w-full border-collapse border border-gray-200 dark:border-gray-700'>
                                            <tbody>
                                                <tr className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                                    <td className="font-bold px-6 py-3 border border-gray-200 dark:border-gray-700">Họ và tên</td>
                                                    <td className="px-6 py-3 border border-gray-200 dark:border-gray-700">{user?.fullName}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-bold px-6 py-3 border border-gray-200 dark:border-gray-700">Email</td>
                                                    <td className="px-6 py-3 border border-gray-200 dark:border-gray-700">{user?.email}</td>
                                                </tr>
                                                <tr className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                                    <td className="font-bold px-6 py-3 border border-gray-200 dark:border-gray-700">Số điện thoại</td>
                                                    <td className="px-6 py-3 border border-gray-200 dark:border-gray-700">{user?.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-bold px-6 py-3 border border-gray-200 dark:border-gray-700">Địa chỉ</td>
                                                    <td className="px-6 py-3 border border-gray-200 dark:border-gray-700">{user?.address}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className='form_item'>
                                            <label
                                                htmlFor="shipping_address"
                                                className="block mb-2 text-sm font-medium text-gray-600 dark:text-white uppercase"
                                            >
                                                Địa chỉ nhận hàng khác (nếu có)
                                            </label>
                                            <textarea
                                                id="shipping_address"
                                                placeholder="nhập địa chỉ gồm tỉnh, huyện, xã, phường"
                                                className="bg-gray-50 min-h-[150px] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                {...register('shipping_address')}
                                            />
                                        </div>
                                        <div className='form_item'>
                                            <label
                                                htmlFor="tracking_number"
                                                className="block mb-2 text-sm font-medium text-gray-600 dark:text-white uppercase"
                                            >
                                                Số điện thoại nhận hàng khác (nếu có)
                                            </label>
                                            <input
                                                type="text"
                                                id="tracking_number"
                                                placeholder="nhập số điện thoại nhận hàng"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                {...register('tracking_number')}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='form_item'>
										<label
											htmlFor="fullName"
											className="block mb-2 text-sm font-medium text-gray-600 dark:text-white uppercase"
										>
											Họ và tên
										</label>
										<input
											type="text"
											id="fullName"
											className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Họ và tên"
											{...register('fullName')}
										/>
										<p className='text-red-500 text-sm pt-3'>{errors.fullName?.message}</p>
									</div>
									<div className='form_item'>
										<label
											htmlFor="email"
											className="block mb-2 text-sm font-medium text-gray-600 dark:text-white uppercase"
										>
											Email
										</label>
										<input
											type="email"
											id="email"
											className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="name@gmail.com"
											{...register('email')}
										/>
										<p className='text-red-500 text-sm pt-3'>{errors.email?.message}</p>
									</div>
									<div className='form_item'>
										<label
											htmlFor="password"
											className="block mb-2 text-sm font-medium text-gray-600 dark:text-white uppercase"
										>
											Mật khẩu
										</label>
										<div className="relative">
										<input
											type={showPassword ? 'text' : 'password'}
											id="password"
											placeholder="••••••••"
											className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												{...register('password')}
											/>
											<button
												type="button"
												onClick={togglePassword}
												className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
											>
												{showPassword ? (
													<AiOutlineEyeInvisible className="w-5 h-5" />
												) : (
													<AiOutlineEye className="w-5 h-5" />
												)}
											</button>
										</div>
										<p className='text-red-500 text-sm pt-3'>{errors.password?.message}</p>
									</div>
									<div className='form_item'>
										<label
											htmlFor="phone"
											className="block mb-2 text-sm font-medium text-gray-600 dark:text-white uppercase"
										>
											Số điện thoại
										</label>
										<input
											type="phone"
											id="phone"
											placeholder="0342681234"
											className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											{...register('phone')}
										/>
										<p className='text-red-500 text-sm pt-3'>{errors.phone?.message}</p>
									</div>
                                    <div className='form_item'>
										<label
											htmlFor="address"
											className="block mb-2 text-sm font-medium text-gray-600 dark:text-white uppercase"
										>
											Địa chỉ nhận hàng
										</label>
										<textarea
											id="address"
											placeholder="nhập địa chỉ gồm tỉnh, huyện, xã, phường"
											className="bg-gray-50 min-h-[150px] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											{...register('address')}
										/>
										<p className='text-red-500 text-sm pt-3'>{errors.address?.message}</p>
									</div>
                                    </>
                                )}
                                    
                                    
                                    <div className="flex gap-x-6">
                                        <div className='form_item'>
                                            <label
                                                className="block mb-2 text-sm font-medium text-gray-600 dark:text-white uppercase"
                                            >
                                                Phương thức thanh toán
                                            </label>
                                            <div className="flex items-center mb-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                                <input id="payment_type1" type="radio" value="1" checked={paymentType === 1}  onChange={handlePaymentType} name="payment_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                                                <label htmlFor="payment_type1" className="ms-2 text-sm font-medium cursor-pointer">Thanh toán khi nhận hàng(COD)</label>
                                            </div>
                                            <div className="flex items-center mb-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                                <input id="payment_type2" type="radio" value="2" checked={paymentType === 2} onChange={handlePaymentType} name="payment_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                                                <label htmlFor="payment_type2" className="ms-2 text-sm font-medium cursor-pointer">Chuyển khoản ngân hàng</label>
                                            </div>
                                            <div className="flex items-center mb-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                                <input id="payment_type3" type="radio" value="3" checked={paymentType === 3} onChange={handlePaymentType} name="payment_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                                                <label htmlFor="payment_type3" className="ms-2 text-sm font-medium cursor-pointer">Thanh toán qua ví điện tử</label>
                                            </div>
                                        </div>
                                        <div className='form_item'>
                                            <label
                                                className="block mb-2 text-sm font-medium text-gray-600 dark:text-white uppercase"
                                            >
                                                Hình thức giao hàng
                                            </label>
                                            <div className="flex items-center mb-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                                <input 
                                                    id="shipping_fee1" 
                                                    type="radio" 
                                                    value="0"
                                                    checked={shippingFee === 0}
                                                    onChange={handleShippingFee}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                                />
                                                <label htmlFor="shipping_fee1" className="ms-2 text-sm font-medium cursor-pointer">
                                                    Miễn phí vận chuyển trong nội thành Đà Nẵng (free)
                                                </label>
                                            </div>
                                            <div className="flex items-center mb-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                                <input 
                                                    id="shipping_fee2" 
                                                    type="radio" 
                                                    value="15000"
                                                    checked={shippingFee === 15000}
                                                    onChange={handleShippingFee}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                                />
                                                <label htmlFor="shipping_fee2" className="ms-2 text-sm font-medium cursor-pointer">
                                                Vận chuyển tiết kiệm (15.000đ)
                                                </label>
                                            </div>
                                            <div className="flex items-center mb-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                                <input 
                                                    id="shipping_fee3" 
                                                    type="radio" 
                                                    value="30000"
                                                    checked={shippingFee === 30000}
                                                    onChange={handleShippingFee}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                                />
                                                <label htmlFor="shipping_fee3" className="ms-2 text-sm font-medium cursor-pointer">
                                                    Vận chuyển nhanh (30.000đ)
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form_item'>
										<label
											htmlFor="note"
											className="block mb-2 text-sm font-medium text-gray-600 dark:text-white uppercase"
										>
											Ghi chú đơn hàng
										</label>
										<textarea
											id="note"
											placeholder="ghi chú đơn hàng"
											className="bg-gray-50 min-h-[150px] border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											{...register('note')}
										/>
										<p className='text-red-500 text-sm pt-3'>{errors.note?.message}</p>
									</div>
									<button
										type="submit"
										className="w-full text-white font-bold text-2xl bg-[#0da487] hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0da487] dark:hover:bg-[#0da487]"
                                    >
										{loading ? 'Đang đặt hàng...' : 'Đặt hàng'}
									</button>
								</form>   
                        </div>
                    </div>
                    {/* Thông tin đơn hàng */}
                    <div className="article_cart">
                        <h2 className="sec_heading">Thông tin đơn hàng</h2>
                        <div className="box_cart">
                            <ul className="cart_list">
                                {products.map((item) => (
                                    <li key={item._id} className="cart_item cart_item_checkout">
                                        <div className="cart_image">
                                            <ImageWithFallback
                                                src={item.thumbnail ? `${globalSetting.UPLOAD_DIRECTORY}/${item.thumbnail}` : '/images/noimage.jpg'}
                                                alt={item.product_name || ''}
                                                width={50}
                                                height={50}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="cart_info">
                                            <p className="cart_name">{item.product_name}</p>
                                            <p className="cart_quantity">x {item.quantity}</p> = 
                                            <p className="cart_price"> 
                                                {formatPrice(item.price * item.quantity * (1 - (item.discount || 0) / 100))}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <table className="table_result">
                                <tbody>
                                    <tr>
                                        <th>Tạm tính:</th>
                                        <td>{formatPrice(totalAmount)}</td>
                                    </tr>
                                    <tr>
                                        <th>Phí vận chuyển:</th>
                                        <td>{formatPrice(shippingFee)}</td>
                                    </tr>
                                    <tr>
                                        <th>Tổng cộng:</th>
                                        <td>{formatPrice(totalAmount + shippingFee)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default CheckoutComponent