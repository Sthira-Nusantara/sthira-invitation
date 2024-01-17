'use client'
import { InvitationData } from '@/utils/invitation-data'
import { animated, useSpring } from '@react-spring/web'
import { useState } from 'react'
import Envelope from './envelope'
import styles from './styles/invitation.module.scss'

export default function Invitation({ user }: { user: InvitationData }) {
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)

    const buttonAnimation = useSpring({
        zIndex: 100,
        y: isEnvelopeOpen ? -40 : 0,
        opacity: isEnvelopeOpen ? 1 : 0,
        delay: 2000,
    })

    return (
        <main className={styles.main}>
            <Envelope user={user} isOpen={isEnvelopeOpen} setIsOpen={setIsEnvelopeOpen} />
            <animated.button className={styles.btnVideo} style={buttonAnimation}>
                Lihat Undangan
            </animated.button>
        </main>
    )
}
