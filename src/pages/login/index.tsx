import Envelope from '@/modules/login/envelope'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Head from 'next/head'
import { useRef } from 'react'

export default function Login() {
    const wrapperRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.from(wrapperRef.current, {
            opacity: 0,
            duration: 1,
            scale: 0.3,
            ease: 'power2.out',
        })
    }, [])

    return (
        <>
            <Head>
                <title>Undangan Peresmian</title>
            </Head>

            <div
                className="w-screen h-screen overflow-hidden flex items-center justify-center px-2 relative"
                ref={wrapperRef}
            >
                <Envelope />
            </div>
        </>
    )
}
