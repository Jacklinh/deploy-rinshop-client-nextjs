'use client';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
const Login = () => {
	const { login, isAuthenticated } = useAuth();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	// show hide password
	const [showPassword, setShowPassword] = useState(false);
	const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    // Xử lý khi đã tài khoản
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const formData = new FormData(e.target as HTMLFormElement);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            const result = await login(email, password);
            if (result.isAuthenticated) {
                router.push('/');
            } else {
                setError('Email hoặc mật khẩu không chính xác');
            }
        } catch (error) {
            console.log('đăng nhập thất bại', error);
            setError('Email hoặc mật khẩu không chính xác');
        } finally {
            setLoading(false);
        }
    }
	return (
		<>
			<section className="sec_login">
				<div className="container mx-auto">
					<div className="login_wrap">
						<div className="login_image">
							<p><Image loading="lazy" src='/images/log-in.png' width={550} height={465} alt='login image' /></p>
						</div>
						<div className="login_box">
							<p className="login_title">
								Chào mừng bạn tới RinKart
								<span>Đăng nhập với tài khoản của bạn</span>
							</p>
							<div className="login_form">
								<form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
									<div className='form_item'>
										<label
											htmlFor="email"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Email
										</label>
										<input
											type="email"
											name="email"
											id="email"
											className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="name@gmail.com"
											value="vanlinh@gmail.com"
											required

										/>
									</div>
									<div className='form_item'>
										<label
											htmlFor="password"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Mật khẩu
										</label>
										<div className="relative">
											<input
												type={showPassword ? 'text' : 'password'}
												name="password"
												id="password"
												placeholder="••••••••"
												className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												value="vanlinh@2024"
												required
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
									</div>
                                    {error && (
                                    <p className="error_message text-sm text-red-500 mb-4">
                                        {error}
                                    </p>
                                    )}
									<button
										type="submit"
										className="w-full text-white font-bold text-2xl bg-[#0da487] hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0da487] dark:hover:bg-[#0da487]"
									>
										{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
									</button>
								</form>
							</div>
							<div className="signup_box">
								<p>Nếu Bạn chưa có tài khoản? <Link href='/register'>Đăng ký ngay</Link></p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Login