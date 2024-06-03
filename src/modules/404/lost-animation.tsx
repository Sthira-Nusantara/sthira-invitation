import { useGSAP } from '@gsap/react'
import Lost from './components/lost'
import gsap from 'gsap'
import Link from 'next/link'

export default function LostAnimation() {
    useGSAP(() => {
        const personIcon = document.getElementById('lost-person')
        const cloudIcon = document.getElementById('lost-cloud')
        const lostText = document.getElementById('lost-text')

        if (!personIcon || !cloudIcon) {
            return
        }

        gsap.fromTo(
            cloudIcon,
            { y: 10 },
            {
                duration: 7,
                ease: 'circ.out',
                yoyo: true,
                repeat: -1,
                y: -150,
            },
        )

        const tl = gsap.timeline()

        tl.add('start')

        tl.from(
            personIcon,
            {
                duration: 1.5,
                y: 1000,
                opacity: 0,
                ease: 'power2.out',
            },
            'start',
        )

        tl.fromTo(
            lostText,
            { y: 300, opacity: 0 },
            {
                duration: 1.5,
                ease: 'power2.out',
                y: -30,
                opacity: 1,
            },
            'start',
        )

        return () => {
            tl.kill()
        }
    }, [])

    return (
        <div className="w-full mx-auto max-w-[600px]">
            <Lost />
            <div id="lost-text">
                <p className="text-center text-3xl text-red-600">Kamu Tersesat?</p>
                <Link href="/" className="text-center w-full inline-block text-gray-400 italic">
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    )
}
