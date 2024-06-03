import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function ContactUs() {
    useGSAP(() => {
        gsap.from('.contact-us', {
            y: -10,
            opacity: 0,
            scrollTrigger: {
                trigger: '.services',
                start: '60%',
                scrub: true,
            },
        })
    }, [])

    return (
        <div className="w1024 contact-us">
            <div className="contact-us-container">
                <div className="contact-background">
                    <Image
                        src={'/assets/img/meeting.jpg'}
                        width={1800}
                        height={700}
                        alt={'preview-meeting'}
                        className={'object-cover w-full h-full'}
                    />
                </div>
                <div className="glass relative">
                    <div className="glass-box"></div>
                    <div className={'glass-text'}>
                        Konsultasikan <br /> Sekarang
                    </div>
                    <Link href={'/contact'} className={'glass-button'}>
                        Hubungi kami
                    </Link>
                </div>
            </div>
        </div>
    )
}
