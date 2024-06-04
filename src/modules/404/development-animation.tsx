import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Development from './components/development'

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
        <div className="w-full">
            <h2 className="text-3xl md:text-6xl text-red-600 text-center">COMING SOON</h2>
            <div className="w-full mx-auto" style={{ maxWidth: 600 }}>
                <Development />
            </div>
            <p className="text-center text-base md:text-xl text-white">
                Our website is under construction, Come to us later when it’s ready
            </p>
        </div>
    )
}
