
import Link from 'next/link'
import IconCart from '../../common/IconCart'
import CategoryNavi from '../../common/CategoryNavi'
import Profile from '../../common/Profile'
const Header = () => {
    return (
        <header className='header_wrap'>
            <div className="container mx-auto">
                <div className="header_inner">
                    <h1 className='header_logo'><Link href='/'>RinKart</Link></h1>
                    <div className="header_navi_right">
                        <CategoryNavi />
                        <ul className="header_nav">
                            <li>
                                <IconCart />
                            </li>
                            <li>
                                <Profile />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header