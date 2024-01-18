'use client'
import { InvitationData } from '@/utils/invitation-data'
import { animated, useSpring } from '@react-spring/web'
import { useRef, useState } from 'react'
import Content from './content'
import Envelope from './envelope'
import styles from './styles/invitation.module.scss'
import Video from './video'

export default function Invitation({ user }: { user: InvitationData }) {
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
    const [mode, setMode] = useState<'envelope' | 'video' | 'content'>('envelope')

    const pageRef = useRef<HTMLDivElement>(null)

    const buttonAnimation = useSpring({
        zIndex: 100,
        y: isEnvelopeOpen ? -40 : 0,
        opacity: isEnvelopeOpen ? 1 : 0,
        delay: 2000,
    })

    const contentAnimation = useSpring({
        display: mode === 'content' ? 'block' : 'none',
        opacity: mode === 'content' ? 1 : 0,
    })

    return (
        <main className={styles.main}>
            {mode === 'envelope' && (
                <div className={styles.envelopeWrapper}>
                    <Envelope user={user} isOpen={isEnvelopeOpen} setIsOpen={setIsEnvelopeOpen} />
                    <animated.button
                        className={styles.btnVideo}
                        style={buttonAnimation}
                        onClick={() => setMode('video')}
                    >
                        Lihat Undangan
                    </animated.button>
                </div>
            )}
            {mode !== 'envelope' && (
                <Video
                    play={mode === 'video'}
                    onVideoEnded={async player => {
                        setMode(mode => {
                            if (mode === 'video') {
                                setTimeout(async () => {
                                    pageRef.current?.scrollIntoView({ behavior: 'smooth' })
                                }, 500)
                            }
                            return 'content'
                        })

                        await player.mute()
                        await player.playVideo()
                    }}
                />
            )}
            <animated.div ref={pageRef} style={contentAnimation}>
                <Content />
            </animated.div>
        </main>
    )
}
