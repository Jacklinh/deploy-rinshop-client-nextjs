'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signUpSchema, SignUpSchema } from '@/library/validations/auth.validation';
import { globalSetting } from '@/constanst/configs';
import { axiosClient } from '@/library/axiosClient';
import { TCustomer } from '@/types/type';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
const SignUp = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit, formState: { errors }, reset } = useForm<SignUpSchema>({
		resolver: yupResolver(signUpSchema),
	});
	const onSubmit = async (data: SignUpSchema) => {
		setLoading(true);
		try {
			const url = `${globalSetting.URL_API}/customers/register`;
			const result = await axiosClient.post<TCustomer>(url, data,{
				headers: {
				  'Content-Type': 'application/json',
				},
			  });
			if(result.status === 201 || result.status === 200) {
				// reset form
				reset();
				const confirm = window.confirm('Đăng ký thành công, bạn có muốn đăng nhập ngay không?');
				if(confirm) {
					router.push('/login');
				}
			}
		} catch (error) {
			console.log('đăng ký thất bại', error);
			alert('Đăng ký thất bại do: cùng tên hoặc email');
		} finally {
			setLoading(false);
		}
	};
	// show hide password
	const [showPassword, setShowPassword] = useState(false);
	const togglePassword = () => {
        setShowPassword(!showPassword);
    };
  return (
    <section className="sec_login">
				<div className="container mx-auto">
					<div className="login_wrap">
						<div className="login_image">
							<p><Image loading="lazy" src='/images/sign-up.png' width='550' height='465' alt='signup image' /></p>
						</div>
						<div className="login_box">
							<p className="login_title">
								Chào mừng bạn tới RinKart
								<span>Đăng Ký tài khoản của bạn</span>
							</p>
							<div className="login_form">
								<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
											Địa chỉ
										</label>
										<textarea
											id="address"
											placeholder="nhập địa chỉ gồm tỉnh, huyện, xã, phường"
											className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											{...register('address')}
										/>
										<p className='text-red-500 text-sm pt-3'>{errors.address?.message}</p>
									</div>
									<button
										type="submit"
										className="w-full text-white font-bold text-2xl bg-[#0da487] hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0da487] dark:hover:bg-[#0da487]"
                                    >
										{loading ? 'Đang đăng ký...' : 'Đăng ký'}
									</button>
								</form>
							</div>
							<div className="signup_box">
                                 <p>Nếu Bạn đã có tài khoản? <Link href='/login'>Đăng nhập ngay</Link></p>
							</div>
						</div>
					</div>
				</div>
		</section>
  )
}

export default SignUp