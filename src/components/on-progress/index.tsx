import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

export default function OnProgressBar() {
    const barRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const tl = gsap.timeline()
        tl.from(barRef.current, {
            width: 0,
            duration: 2,
            ease: 'elastic.out',
        })

        tl.from(barRef.current, {
            fontSize: 0,
            duration: 0.5,
            ease: 'bounce.inOut',
        })

        const spanText = gsap.utils.toArray<HTMLSpanElement>(barRef.current?.querySelector('span') || null)?.[0]

        if (spanText) {
            tl.fromTo(
                spanText,
                { xPercent: -20 },
                {
                    xPercent: 90,
                    duration: 4,
                    repeat: -1,
                    ease: 'circ.out',
                    yoyo: true,
                },
            )
        }

        return () => {
            tl.kill()
        }
    }, [])

    return (
        <div className="w-full min-h-6 bg-red-600 top-0 left-0 bg-opacity-40 overflow-hidden">
            <div className="h-full min-h-6 w-full py-1 px-3 bg-red-600 text-sm" ref={barRef}>
                <span className="inline-block w-full">Website On Progress</span>
            </div>
        </div>
    )
}
