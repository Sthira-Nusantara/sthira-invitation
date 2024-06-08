import { OPENING_DATE } from '@/config/config'
import { useEffect, useState } from 'react'
import Clock from 'react-clock'
import Countdown from 'react-countdown'
import { MenuBaseProps } from '../../types/menu-base-props'
import TimeCountdown from './time-countdown'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import gsap from 'gsap'

export default function InvitationTime(props: MenuBaseProps) {
    const [value, setValue] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    useGSAP(() => {
        gsap.set('section#time', { opacity: 0 })
        gsap.set('#clock', { opacity: 0, scale: 0 })

        ScrollTrigger.create({
            trigger: 'section#time',
            start: 'top center',
            end: 'top center',
            onEnter: () => {
                gsap.to('#clock', {
                    opacity: 1,
                    duration: 1.5,
                    scale: 1,
                    ease: 'back.in',
                })
                gsap.to('section#time', {
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out',
                })
            },
        })
    }, [])

    return (
        <section
            className="w-screen min-h-screen overflow-hidden flex items-center justify-center invitation relative"
            id="time"
        >
            <div className="absolute w-full h-full -z-10 flex items-center justify-center">
                <div className="max-w-96 h-96 w-full md:w-[36rem] md:h-[36rem]" id="clock">
                    <Clock value={value} size="100%" />
                </div>
            </div>
            <div className="container mx-auto flex flex-col items-center">
                <Countdown
                    date={OPENING_DATE.toDate()}
                    renderer={countdownProps => <TimeCountdown {...props} {...countdownProps} />}
                />
            </div>
        </section>
    )
}
