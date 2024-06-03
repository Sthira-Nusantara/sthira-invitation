import Marquee from '@/components/marquee'
import { MarqueeTimeline } from '@/gsap/marquee'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { networkData, networkDataMapped } from './data/network'
import { ZoneBaseProps } from './types/base-props'

export default function ZoneMarquee({ dataActive, setDataActive }: ZoneBaseProps) {
    const marqueeTLRef = useRef<MarqueeTimeline>(null)
    const citiesRef = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)

    const marqueeTL = marqueeTLRef.current

    useGSAP(() => {
        if (!dataActive) {
            return unhighlight()
        }

        highlight(dataActive.id)
    }, [dataActive])

    useEffect(() => {
        const element = citiesRef.current
        if (!element) {
            return
        }

        const height = element.clientHeight
        if (!height) {
            return
        }

        gsap.to(element.parentElement, { height: height, duration: 1 })
    }, [citiesRef.current])

    const unhighlight = () => {
        if (!marqueeTL) {
            return
        }
        gsap.to(marqueeTL.items, { opacity: '1', duration: 1, color: 'white' })
        marqueeTL?.resume()
    }

    const highlight = (id: string) => {
        if (!marqueeTL) {
            return
        }

        let indexActive = 0
        marqueeTL.items.forEach((child, index) => {
            if (child.dataset.id === id) {
                indexActive = index
                gsap.to(child, { opacity: '1', duration: 1, color: '#a5171b' })
                return
            }
            gsap.to(child, { opacity: '0.2', duration: 1, color: 'white' })
        })

        if (hovered) {
            marqueeTL?.pause()
        } else {
            marqueeTL?.toIndex(indexActive, { duration: 0.4, ease: 'power1.inOut' })
        }
    }

    const onMouseEnter: MouseEventHandler<HTMLDivElement> = item => {
        setDataActive(networkDataMapped[item.currentTarget.dataset.id as any])
        setHovered(true)
    }

    const onMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
        setDataActive(undefined)
        setHovered(false)
    }

    return (
        <Marquee ref={marqueeTLRef} className="gap-x-5 items-start">
            {!dataActive?.cities?.length && <div ref={citiesRef} />}
            {networkData.map((network, i) => {
                const isActive = dataActive?.id === network.id
                return (
                    <div
                        className="marquee-child cursor-pointer relative"
                        key={`${network.id}-${i}`}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        data-id={network.id}
                    >
                        <p className="text-2xl break-all whitespace-nowrap">{network.name}</p>
                        {isActive && !!dataActive.cities?.length && (
                            <div className="w-full relative">
                                <div
                                    className="absolute top-0 left-0 min-w-full max-h-20 flex flex-col flex-wrap gap-x-3"
                                    ref={citiesRef}
                                >
                                    {dataActive.cities.map((city, i) => (
                                        <div
                                            className="w-full border-b-red-600 border-solid border-b-2 px-1 whitespace-nowrap"
                                            key={'city-' + i}
                                        >
                                            <p className="text-white">{city}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </Marquee>
    )
}
