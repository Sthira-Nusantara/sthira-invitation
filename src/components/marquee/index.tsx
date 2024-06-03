import marqueeTimeline, { MarqueeTimeline } from '@/gsap/marquee'
import gsap from 'gsap'
import { ForwardedRef, PropsWithChildren, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

interface MarqueeProps extends PropsWithChildren {
    className?: string
    paddingRight?: number
}

function MarqueeComponent({ children, className, paddingRight }: MarqueeProps, ref: ForwardedRef<MarqueeTimeline>) {
    const [marqueeTL, setMarqueeTL] = useState<MarqueeTimeline>()
    const marqueeWrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const marquees = gsap.utils.toArray<HTMLDivElement>(marqueeWrapperRef.current?.children || [])
        const tl = marqueeTimeline(marquees, {
            speed: 0.5,
            repeat: -1,
            paused: false,
            reversed: true,
            paddingRight: `${paddingRight || 0}px`,
            minWidth: (marqueeWrapperRef.current?.clientWidth || 0) + 400,
        })

        window.addEventListener('resize', function () {
            tl.recalculate()
        })

        setMarqueeTL(tl)

        return () => {
            tl.kill()
        }
    }, [])

    useImperativeHandle(ref, () => marqueeTL as MarqueeTimeline, [marqueeTL])

    return (
        <div ref={marqueeWrapperRef} className={['w-full flex', className || ''].join(' ')}>
            {children}
        </div>
    )
}

const Marquee = forwardRef(MarqueeComponent)

export default Marquee
