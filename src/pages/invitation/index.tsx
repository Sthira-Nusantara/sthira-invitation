import { useApp } from '@/context/app/useContext'
import LogoBackground from '@/modules/invitation/logo-bg'
import Popup from '@/modules/invitation/popup'
import InvitationForm from '@/modules/invitation/sections/form'
import InvitationHome from '@/modules/invitation/sections/home'
import InvitationTime from '@/modules/invitation/sections/time'
import InvitationVideo from '@/modules/invitation/sections/video'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'

export default function Invitation() {
    const { user } = useApp()
    const router = useRouter()

    const wrapperRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!user) {
            gsap.set(wrapperRef.current, { opacity: 0 })
            router.replace('/login')
            return
        }

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

            <div className="relative" ref={wrapperRef}>
                {user?.notes?.trim() && <Popup />}
                <InvitationHome />
                <InvitationVideo />
                <InvitationForm />
                <InvitationTime />
                <LogoBackground />
            </div>
        </>
    )
}
