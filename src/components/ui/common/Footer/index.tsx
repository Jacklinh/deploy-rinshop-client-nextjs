import Link from 'next/link'
import { 
    FaFacebook, 
    FaGithub,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaClock,
    FaChevronRight 
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-[#0da487] text-white mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-12">
                    {/* Thông tin cửa hàng */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold mb-4">Về Chúng Tôi</h3>
                        <p className="text-gray-100 mb-6 leading-relaxed">
                            Chuyên cung cấp các sản phẩm chất lượng cao với giá cả hợp lý. Cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng.
                        </p>
                        <div className="flex justify-center sm:justify-start space-x-6">
                            <Link href="https://www.facebook.com/rinlee138/" target='_blank' className="text-2xl hover:text-gray-300 transition-colors">
                                <FaFacebook />
                            </Link>
                            <Link href="https://github.com/Jacklinh?tab=repositories" target='_blank' className="text-2xl hover:text-gray-300 transition-colors">
                                <FaGithub />
                            </Link>
                        </div>
                    </div>

                    {/* Links hữu ích */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold mb-4">Liên Kết</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="hover:text-gray-300 transition-colors flex items-center justify-center sm:justify-start">
                                    <FaChevronRight className="mr-2 text-sm" />
                                    Trang Chủ
                                </Link>
                            </li>
                            <li>
                                <Link href="https://deploy-rinshop-admin.vercel.app/" target='_blank' className="hover:text-gray-300 transition-colors flex items-center justify-center sm:justify-start">
                                    <FaChevronRight className="mr-2 text-sm" />
                                    Trang admin
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Thông tin liên hệ */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold mb-4">Liên Hệ</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center justify-center sm:justify-start">
                                <FaMapMarkerAlt className="w-6" />
                                884 nguyễn lương bằng, thành phố Đà Nẵng
                            </li>
                            <li className="flex items-center justify-center sm:justify-start">
                                <FaPhone className="w-6" />
                                +84 342681138
                            </li>
                            <li className="flex items-center justify-center sm:justify-start">
                                <FaEnvelope className="w-6" />
                                jacklinh79@gmail.com
                            </li>
                            <li className="flex items-center justify-center sm:justify-start">
                                <FaClock className="w-6" />
                                8:00 - 17:00, Thứ 2 - Thứ 6
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-200/20 py-6">
                    <div className="text-center">
                        <p className="text-gray-100">
                            © {new Date().getFullYear()} Copyright by{" "}
                            <span className="font-semibold hover:text-gray-300 transition-colors">
                        Le Van Linh
                    </span>
                </p>
                    </div>
                </div>
            </div>
        </footer>
  )
}

export default Footer