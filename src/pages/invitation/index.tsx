import InvitationHome from '@/modules/invitation/home'
import LogoBackground from '@/modules/invitation/logo-bg'
import InvitationTime from '@/modules/invitation/time'
import Head from 'next/head'
import { useRef } from 'react'

export default function Invitation() {
    const wrapperRef = useRef<HTMLDivElement>(null)

    return (
        <>
            <Head>
                <title>Grand Opening Invitation</title>
            </Head>

            <div className="relative w-screen h-screen overflow-hidden overflow-y-auto" ref={wrapperRef}>
                <InvitationHome />
                <InvitationTime />
                <LogoBackground />
            </div>
        </>
    )
}
