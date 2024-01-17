import logoPng from '@/assets/logo.png'
import { useEnvelopeLetterAnimation } from '@/hooks/envelope-animation'
import { InvitationData } from '@/utils/invitation-data'
import { animated } from '@react-spring/web'
import Image from 'next/image'
import styles from './styles/envelope.module.scss'

export default function Envelope({
    user,
    isOpen,
    setIsOpen,
}: {
    user: InvitationData
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}) {
    const animation = useEnvelopeLetterAnimation(isOpen)

    return (
        <div onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.envelope}>
                <div className={`${styles.front} ${styles.flap}`} />
                <div className={styles.pocketWrapper}>
                    <div className={`${styles.front} ${styles.pocket}`} />
                    <animated.div style={animation.logoAnimation} className={styles.image}>
                        <Image src={logoPng} alt="Logo Sthira Nusantara" width={60} height={60} />
                    </animated.div>
                </div>

                <animated.div
                    className={styles.letter}
                    style={animation.wrapperAnimation}
                    onClick={e => {
                        e.stopPropagation()
                    }}
                >
                    {isOpen ? (
                        <animated.div className={styles.greeting} style={animation.letterAnimation}>
                            <p className={styles.welcomeMessage}>
                                {user.notes || (
                                    <>
                                        Terimakasih atas waktunya <span className={styles.bold}>{user.name}</span>,
                                        dengan ini kami mempersembahkan sebuah undangan untuk anda.
                                    </>
                                )}
                            </p>
                            <p className={styles.regards}>
                                Regards,
                                <br />
                                PT. Sthira Nusantara
                            </p>
                        </animated.div>
                    ) : (
                        <>
                            <p style={{ marginTop: 5 }} className={styles.glowingText}>
                                Undangan
                            </p>
                            <p style={{ fontSize: 14, marginTop: -5 }}>Klik untuk rincian</p>
                        </>
                    )}
                </animated.div>
            </div>
        </div>
    )
}
