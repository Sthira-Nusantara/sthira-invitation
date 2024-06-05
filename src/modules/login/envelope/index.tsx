import { useApp } from '@/context/app/useContext'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Flip from 'gsap/dist/Flip'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { LoginDto, login } from '../action/login'
import styles from '../styles/envelope.module.css'
import EnvelopeCard from './card'
import EnvelopeTop from './top'

export default function Envelope() {
    const router = useRouter()
    const { setUser } = useApp()

    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState('')

    const envelopeTL = useMemo(() => gsap.timeline({ paused: true }), [])

    useGSAP(() => {
        envelopeTL.call(() => animateEnvelopeTop(), [], 0.1)

        envelopeTL.to(`.${styles.card}`, {
            bottom: '3rem',
            duration: 1,
            display: 'block',
            opacity: 1,
            ease: 'power4.out',
            delay: 1,
        })
        envelopeTL.to(`.${styles.card}`, { bottom: 0, zIndex: 100, duration: 0.5, ease: 'power4.out' })
    }, [])

    const toggleEnvelope = () => {
        if (isOpen) {
            envelopeTL.reverse()
        } else {
            envelopeTL.play()
        }
        setIsOpen(!isOpen)
    }

    const closeEnvelope = () => {
        envelopeTL.reverse()
        setIsOpen(false)
    }

    const openEnvelope = () => {
        envelopeTL.play()
        setIsOpen(true)
    }

    const waitAnimation = async (ms?: number) => {
        const totalDuration = envelopeTL.totalDuration()
        await new Promise(resolve => setTimeout(resolve, ms || totalDuration * 1000))
    }

    const animateEnvelopeTop = () => {
        const envelopeTopEl = document.getElementById('envelope-top')
        if (!envelopeTopEl) {
            return
        }

        const envelopeState = Flip.getState(envelopeTopEl)

        if (envelopeTopEl.classList.contains(styles.close)) {
            envelopeTopEl.classList.remove(styles.close)
            envelopeTopEl.classList.add(styles.open)
        } else {
            envelopeTopEl.classList.remove(styles.open)
            envelopeTopEl.classList.add(styles.close)
            setError('')
        }

        Flip.from(envelopeState, {
            duration: 0.1,
            ease: 'power4.out',
        })
    }

    const loginAction = async (form: LoginDto, setForm: (form: LoginDto) => void) => {
        closeEnvelope()

        await waitAnimation()

        setForm({ uxsr: '', pxwd: '' })

        try {
            const user = await login(form)
            setUser(user)

            gsap.to(`.${styles.envelope}`, {
                opacity: 0,
                duration: 2,
                scale: 10,
                onComplete: () => {
                    router.replace('/invitation', undefined, { shallow: true })
                },
            })
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
                await waitAnimation(500)
                openEnvelope()
            }
        }
    }

    return (
        <>
            <div className={styles.envelope} onClick={() => toggleEnvelope()}>
                <EnvelopeTop error={error} />
                <div className={styles.envelopeBodyTop}>
                    <div className={styles.trapezium} />
                    <EnvelopeCard login={loginAction} />
                </div>
                <div className={styles.envelopeBody}>
                    <div className="w-fit border-b border-solid border-b-white pb-1">
                        <p className="text-sm font-eczar font-bold">Sthira Nusantara</p>
                    </div>
                </div>
            </div>
        </>
    )
}
