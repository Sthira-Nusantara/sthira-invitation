import LogoBackground from '@/modules/invitation/logo-bg'
import InvitationForm from '@/modules/invitation/sections/form'
import InvitationHome from '@/modules/invitation/sections/home'
import InvitationTime from '@/modules/invitation/sections/time'
import InvitationVideo from '@/modules/invitation/sections/video'
import { VideoFrameElement } from '@/modules/invitation/sections/video/frame'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Head from 'next/head'
import { useRef } from 'react'

export default function Invitation() {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<VideoFrameElement>(null)

    useGSAP(() => {
        gsap.from(wrapperRef.current, {
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            delay: 0.5,
        })
    }, [])

    return (
        <>
            <Head>
                <title>Undangan Peresmian</title>
            </Head>

            <div className="relative h-screen overflow-hidden" ref={wrapperRef}>
                <div className="absolute bottom-0 w-full">
                    <div
                        className="mx-auto w-fit flex flex-col justify-center animate-bounce cursor-pointer"
                        onClick={e => {
                            wrapperRef.current?.classList.remove('h-screen', 'overflow-hidden')

                            const video = document.getElementById('video')
                            video?.scrollIntoView({ behavior: 'smooth' })

                            setTimeout(() => {
                                const element = e.target as HTMLDivElement

                                element?.parentElement?.remove()

                                videoRef.current?.playVideo?.(true)
                            }, 1000)
                        }}
                    >
                        <p className="text-center text-xs md:text-base text-white">Lihat Selengkapnya</p>
                        <FontAwesomeIcon icon={faArrowDown} className="text-3xl text-red-600 h-8" />
                    </div>
                </div>
                <InvitationHome />
                <InvitationVideo videoRef={videoRef} />
                <InvitationForm />
                <InvitationTime />
                <LogoBackground />
            </div>
        </>
    )
}
