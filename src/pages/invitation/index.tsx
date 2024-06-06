import LogoBackground from '@/modules/invitation/logo-bg'
import InvitationForm from '@/modules/invitation/sections/form'
import InvitationHome from '@/modules/invitation/sections/home'
import InvitationTime from '@/modules/invitation/sections/time'
import InvitationVideo from '@/modules/invitation/sections/video'
import Head from 'next/head'
import { useRef } from 'react'

export default function Invitation() {
    const wrapperRef = useRef<HTMLDivElement>(null)

    return (
        <>
            <Head>
                <title>Grand Opening Invitation</title>
            </Head>

            <div className="relative" ref={wrapperRef}>
                <InvitationHome />
                <InvitationForm />
                <InvitationVideo />
                <InvitationTime />
                <LogoBackground />
            </div>
        </>
    )
}
