import { Skeleton } from "@/components/ui/skeleton";

const CheckoutLoading = () => {
  return (
    <section className="sec_checkout">
      <div className="container mx-auto py-8">
        <div className="box_checkout flex flex-col lg:flex-row gap-8">
          {/* Form bên trái */}
          <div className="article_use lg:w-2/3">
            <div className="article_form bg-white p-6 rounded-lg">
              <Skeleton className="h-8 w-48 mb-6" />
              
              {/* Loading form fields */}
              <div className="space-y-4 md:space-y-6">
                {/* Loading input fields */}
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="form_item">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}

                {/* Loading payment & shipping methods */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Payment methods */}
                  <div className="w-full md:w-1/2">
                    <Skeleton className="h-4 w-40 mb-4" />
                    {[1, 2].map((item) => (
                      <div key={item} className="flex items-center mb-4 p-3 rounded-lg border border-gray-100">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-48 ml-2" />
                      </div>
                    ))}
                  </div>

                  {/* Shipping methods */}
                  <div className="w-full md:w-1/2">
                    <Skeleton className="h-4 w-40 mb-4" />
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center mb-4 p-3 rounded-lg border border-gray-100">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-48 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Loading note field */}
                <div className="form_item">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-24 w-full" />
                </div>

                {/* Loading submit button */}
                <Skeleton className="h-12 w-full mt-6" />
              </div>
            </div>
          </div>

          {/* Order summary bên phải */}
          <div className="article_order lg:w-1/3">
            <div className="order_box bg-white p-6 rounded-lg">
              <Skeleton className="h-6 w-40 mb-6" />
              
              {/* Loading order items */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 mb-4 pb-4 border-b">
                  <Skeleton className="h-20 w-20 rounded" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}

              {/* Loading order summary */}
              <div className="space-y-3 mt-6">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutLoading;