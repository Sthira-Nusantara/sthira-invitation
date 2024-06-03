import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { PropsWithChildren, useRef } from 'react'

interface BackTextProps extends PropsWithChildren {
    text: string
    centerize?: boolean
    animation?: 'up' | 'scrollTrigger'
    className?: string
    headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export default function BackText({
    text,
    children,
    centerize,
    className,
    animation = 'scrollTrigger',
    headingType = 'h1',
}: BackTextProps) {
    const backTextRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const markers = false

        if (animation === 'up') {
            // gsap.from(backTextRef.current, {
            //     y: 100,
            //     duration: 1,
            //     scrollTrigger: {
            //         trigger: heroRef.current,
            //         start: `-100px`,
            //         markers,
            //     },
            // })

            const scrollTrigger = ScrollTrigger.create({
                trigger: heroRef.current,
                start: `-100px`,
                end: `50%`,
                pin: false,
                markers,
                onUpdate: self => {
                    const options = {
                        y: `-${100 * self.progress}px`,
                        duration: 1,
                        ease: 'power3.out',
                    }
                    gsap.to(backTextRef.current, options)
                },
            })

            return () => {
                scrollTrigger.kill()
            }
        }

        if (animation === 'scrollTrigger') {
            const { maxX, maxY, width, height } = calculateElement()

            const scrollTrigger = ScrollTrigger.create({
                trigger: heroRef.current,
                start: `${top}px`,
                end: `${height}px`,
                scrub: true,
                pin: false,
                markers,
                onUpdate: self => {
                    const options = {
                        x: `-${width * 2 * self.progress}px`,
                        y: `${height * 2 * self.progress}px`,
                        duration: 1,
                        ease: 'power3.out',
                    }

                    if (-parseFloat(options.x) > maxX) {
                        options.x = `-${maxX}px`
                    }

                    if (parseFloat(options.y) > maxY) {
                        options.y = `${maxY}px`
                    }

                    gsap.to(backTextRef.current, options)
                },
            })

            return () => {
                scrollTrigger.kill()
            }
        }
    }, [])

    const calculateElement = () => {
        const top = heroRef.current?.offsetTop || 0
        const height = heroRef.current?.offsetHeight || 0
        const width = heroRef.current?.offsetWidth || 0

        const widthBackText = backTextRef.current?.offsetWidth || 0
        const heightBackText = backTextRef.current?.offsetHeight || 0

        const right = widthBackText > width / 2 ? widthBackText / 2 + 150 : 0

        if (backTextRef.current) {
            backTextRef.current.style.right = `-${right}px`
            // backTextRef.current.style.top = `${top}px`
        }

        let maxX = 0
        let maxY = 0
        if (centerize) {
            maxX = width / 2 - widthBackText / 2 + right
            maxY = height / 2 - heightBackText / 2
        } else {
            maxX = width - widthBackText + right * 2
            maxY = height - heightBackText
        }

        return {
            top,
            height,
            width,
            maxX,
            maxY,
            widthBackText,
            heightBackText,
        }
    }

    const headingRender = () => {
        switch (headingType) {
            case 'h2':
                return (
                    <h2 style={{ lineHeight: `${16 * 1.1}rem` }} className="text-[16rem]">
                        {text}
                    </h2>
                )
            case 'h3':
                return (
                    <h3 style={{ lineHeight: `${14 * 1.1}rem` }} className="text-[14rem]">
                        {text}
                    </h3>
                )
            case 'h4':
                return (
                    <h4 style={{ lineHeight: `${12 * 1.1}rem` }} className="text-[12rem]">
                        {text}
                    </h4>
                )
            case 'h5':
                return (
                    <h5 style={{ lineHeight: `${10 * 1.1}rem` }} className="text-[10rem]">
                        {text}
                    </h5>
                )
            case 'h6':
                return (
                    <h6 style={{ lineHeight: `${8 * 1.1}rem` }} className="text-[8rem]">
                        {text}
                    </h6>
                )
            default:
                return (
                    <h1 style={{ lineHeight: `auto` }} className="text-8xl md:text-[18rem]">
                        {text}
                    </h1>
                )
        }
    }

    return (
        <div className="hero overflow-visible relative" ref={heroRef}>
            <div ref={backTextRef} className="back-text">
                {headingRender()}
            </div>
            <div className={`${className || ''}`}>{children}</div>
        </div>
    )
}
