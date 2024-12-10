
'use client';
import { GrUserAdmin  } from "react-icons/gr";
import Link from 'next/link';
import useAuth from "@/hooks/useAuth";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
const Profile = () => {
    const { user,logout } = useAuth();
    return (
        <>
            {
                user ? (
                    <div className="register_name">
                        <Popover>
                            <PopoverTrigger>
                                {user.fullName}
                            </PopoverTrigger>
                            <PopoverContent>
                                <Link href='/profile' className='popover_link'>Thông tin tài khoản</Link>
                                <Link href='/login' onClick={logout} className='popover_link'>Đăng xuất</Link>
                            </PopoverContent>
                        </Popover>
                    </div>
                ): (
                    <p className="header_icon_register">
                        <Popover>
                            <PopoverTrigger>
                                <GrUserAdmin />
                            </PopoverTrigger>
                            <PopoverContent>
                                <Link href='/login' className='popover_link'>
                                    Đăng nhập tài khoản
                                </Link>
                                <Link href='/register' className='popover_link'>
                                    Đăng ký tài khoản
                                </Link>
                            </PopoverContent>
                        </Popover>
                    </p>
                )
            }
        </>
    )
}

export default Profile