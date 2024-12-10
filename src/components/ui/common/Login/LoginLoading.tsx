
import { Skeleton } from "@/components/ui/skeleton";
const LoginLoading = () => {
  return (
    <section className="sec_login">
      <div className="container mx-auto">
        <div className="login_wrap">
          {/* Image Skeleton */}
          <div className="login_image">
            <Skeleton className="w-[550px] h-[465px] rounded-lg" />
          </div>

          {/* Form Skeleton */}
          <div className="login_box">
            {/* Title Skeleton */}
            <div className="login_title mb-6 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <div className="login_form">
              <div className="space-y-4 md:space-y-6">
                {/* Email Input Skeleton */}
                <div className="form_item">
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Password Input Skeleton */}
                <div className="form_item">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Button Skeleton */}
                <Skeleton className="h-12 w-full mt-6" />
              </div>
            </div>

            {/* Sign up link Skeleton */}
            <div className="signup_box mt-6">
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginLoading