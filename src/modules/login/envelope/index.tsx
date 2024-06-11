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
import { errPasswordMsg } from '@/pages/api/login'

export default function Envelope() {
    const router = useRouter()
    const { setUser } = useApp()

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState<LoginDto>({
        uxsr: '',
        pxwd: '',
    })

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

        gsap.from(`.${styles.envelope}`, {
            opacity: 0,
            duration: 1,
            scale: 0.3,
            ease: 'power2.out',
            onComplete: () => {
                openEnvelope()
            },
        })
    }, [])

    const toggleEnvelope = () => {
        if (isLoading) return

        if (!isOpen) {
            envelopeTL.play()
            setIsOpen(true)
            return
        }

        if (form.pxwd || form.uxsr) {
            return
        }

        envelopeTL.reverse()
        setIsOpen(false)
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

    const loginAction = async () => {
        closeEnvelope()

        await waitAnimation()

        try {
            setIsLoading(true)

            const user = await login(form)
            setUser(user)

            setIsLoading(false)

            gsap.to(`.${styles.envelope}`, {
                opacity: 0,
                duration: 2,
                scale: 10,
            })
            gsap.to(`.bg-img`, {
                opacity: 0,
                duration: 2,
            })

            await waitAnimation(1500)
            router.replace('/invitation', undefined, { shallow: true })
        } catch (error) {
            setIsLoading(false)
            if (error instanceof Error) {
                setError(error.message)
                setForm({ uxsr: error.message === errPasswordMsg ? form.uxsr : '', pxwd: '' })
                await waitAnimation(500)
                openEnvelope()
            }
        }
    }

    return (
        <div className={styles.envelope} onClick={() => toggleEnvelope()}>
            <EnvelopeTop error={error} isLoading={isLoading} />
            <div className={styles.envelopeBodyTop}>
                <div className={styles.trapezium} />
                <EnvelopeCard login={loginAction} form={form} setForm={setForm} />
            </div>
            <div className={styles.envelopeBody}>
                <div className="w-fit border-b border-solid border-b-white pb-1">
                    <p className="text-sm font-eczar font-bold">Sthira Nusantara</p>
                </div>
            </div>
        </div>
    )
}
