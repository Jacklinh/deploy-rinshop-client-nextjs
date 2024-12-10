import Login from '@/components/ui/common/Login';
import LoginLoading from '@/components/ui/common/Login/LoginLoading';
import { Suspense } from 'react';
const LoginPage = () => {
	
	return (
		<>	
			<Suspense fallback={<LoginLoading />}>
				<Login />
			</Suspense>
		</>	
	)
}

export default LoginPage