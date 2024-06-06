import LogoBackground from '@/modules/invitation/logo-bg'
import InvitationHome from '@/modules/invitation/sections/home'
import InvitationTime from '@/modules/invitation/sections/time'
import Head from 'next/head'
import { useRef } from 'react'

export default function Invitation() {
    const wrapperRef = useRef<HTMLDivElement>(null)

    return (
        <>
            <Head>
                <title>Grand Opening Invitation</title>
            </Head>

            <div className="relative w-screen h-screen" ref={wrapperRef}>
                <InvitationHome />
                <InvitationTime />
                <LogoBackground />
            </div>
        </>
    )
}
