'use client'
import { InvitationData } from '@/utils/invitation-data'
import { animated, useSpring } from '@react-spring/web'
import { useState } from 'react'
import Envelope from './envelope'
import styles from './styles/invitation.module.scss'
import Video from './video'

export default function Invitation({ user }: { user: InvitationData }) {
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
    const [mode, setMode] = useState<'envelope' | 'video'>('envelope')

    const buttonAnimation = useSpring({
        zIndex: 100,
        y: isEnvelopeOpen ? -40 : 0,
        opacity: isEnvelopeOpen ? 1 : 0,
        delay: 2000,
    })

    return (
        <main className={styles.main}>
            {mode === 'envelope' && (
                <>
                    <Envelope user={user} isOpen={isEnvelopeOpen} setIsOpen={setIsEnvelopeOpen} />
                    <animated.button
                        className={styles.btnVideo}
                        style={buttonAnimation}
                        onClick={() => setMode('video')}
                    >
                        Lihat Undangan
                    </animated.button>
                </>
            )}
            {mode === 'video' && <Video play={mode === 'video'} />}
        </main>
    )
}
