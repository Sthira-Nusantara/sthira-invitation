import Link from 'next/link'
import Development from './components/development'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function DevelopmentAnimation() {
    useGSAP(() => {
        gsap.from('#development', {
            opacity: 0,
            duration: 3,
            ease: 'power3.out',
        })

        gsap.from('.development-text', {
            fontSize: 0,
            ease: 'sine.in',
            duration: 0.7,
        })
    }, [])

    return (
        <div className="w-full mx-auto max-w-[600px]">
            <Development />
            <div>
                <p className="text-center text-xl text-red-600 development-text">
                    Dalam pengembangan, kembali lagi nanti
                </p>
                <Link href="/" className="text-center w-full inline-block text-gray-400 italic development-text">
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    )
}
