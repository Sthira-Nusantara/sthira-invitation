import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Flip from 'gsap/dist/Flip'
import { useMemo, useState } from 'react'
import EnvelopeCard from './card'
import styles from '../styles/envelope.module.css'
import EnvelopeTop from './top'

export default function Envelope() {
    const [isOpen, setIsOpen] = useState(false)

    const envelopeTL = useMemo(() => gsap.timeline({ paused: true }), [])

    useGSAP(() => {
        envelopeTL.call(() => animateEnvelopeTop(), [], 0.2)

        envelopeTL.to(`.${styles.card}`, {
            bottom: '3rem',
            duration: 2,
            display: 'block',
            opacity: 1,
            ease: 'power4.out',
        })
        envelopeTL.to(`.${styles.card}`, { bottom: 0, zIndex: 100, duration: 0.5, ease: 'power4.out' })
    }, [])

    const onEnvelopeClick = () => {
        if (isOpen) {
            envelopeTL.duration(1).reverse()
        } else {
            envelopeTL.duration(envelopeTL.totalDuration()).play()
        }
        setIsOpen(!isOpen)
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
        }

        Flip.from(envelopeState, {
            duration: 0.2,
            ease: 'power4.out',
        })
    }

    return (
        <div className={styles.envelope} onClick={() => onEnvelopeClick()}>
            <EnvelopeTop />
            <div className={styles.envelopeBodyTop}>
                <div className={styles.trapezium} />
                <EnvelopeCard />
            </div>
            <div className={styles.envelopeBody}>
                <div className="w-fit border-b border-solid border-b-white pb-1">
                    <p className="text-sm font-eczar font-bold">Sthira Nusantara</p>
                </div>
            </div>
        </div>
    )
}
