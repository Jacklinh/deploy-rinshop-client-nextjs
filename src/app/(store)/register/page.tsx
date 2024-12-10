import SignUp from '@/components/ui/common/SignUp';
import SignUpLoading from '@/components/ui/common/SignUp/SignUpLoading';
import { Suspense } from 'react';
const RegisterPage = () => {
	return (
		<Suspense fallback={<SignUpLoading />}>
			<SignUp />
		</Suspense>
	)
}

export default RegisterPage