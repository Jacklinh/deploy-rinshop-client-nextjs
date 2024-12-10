
import CheckoutComponent from '@/components/ui/common/Checkout';
import CheckoutLoading from '@/components/ui/common/Checkout/CheckoutLoading';
import { Suspense } from 'react';
const Checkout = () => {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutComponent />
    </Suspense>
  )
}

export default Checkout