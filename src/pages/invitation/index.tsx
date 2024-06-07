import LogoBackground from '@/modules/invitation/logo-bg'
import InvitationForm from '@/modules/invitation/sections/form'
import InvitationHome from '@/modules/invitation/sections/home'
import InvitationTime from '@/modules/invitation/sections/time'
import InvitationVideo from '@/modules/invitation/sections/video'
import { VideoFrameElement } from '@/modules/invitation/sections/video/frame'
import Head from 'next/head'
import { useRef } from 'react'

export default function Invitation() {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<VideoFrameElement>(null)

    return (
        <>
            <Head>
                <title>Undangan Peresmian</title>
            </Head>

            <div className="relative h-screen overflow-hidden" ref={wrapperRef}>
                <div
                    className="absolute bottom-0"
                    onClick={() => {
                        wrapperRef.current?.classList.remove('h-screen', 'overflow-hidden')
                        const video = document.getElementById('video')
                        video?.scrollIntoView({ behavior: 'smooth' })
                        setTimeout(() => {
                            videoRef.current?.playVideo?.(true)
                        }, 500)
                    }}
                >
                    Scroll Ke Bawah
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
