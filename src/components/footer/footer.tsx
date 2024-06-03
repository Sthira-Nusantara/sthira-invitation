import { SNLogoOnly } from '@/assets/icons'
import { socialMedias } from '@/modules/home/data/social-medias'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container w1024">
                <div className="brand">
                    <div className="">
                        <div className="image">
                            <Link href={'/'}>
                                <SNLogoOnly id="footer-logo" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="menu">
                    <div className={'menu-section'}>
                        <div className="menu-head">Ikuti Kami</div>
                        <ul>
                            {socialMedias.map((socialMedia, i) => (
                                <li key={i}>
                                    <Link href={socialMedia.link}>{socialMedia.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <hr />
                <div className="copyright">
                    <span className="fw-700">Copyright ©2024</span>, PT. Sthira Nusantara, All Right Reserved
                </div>
            </div>
        </footer>
    )
}

export default Footer
