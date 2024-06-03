import Image from 'next/image'
import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function VirtualTour() {
    useGSAP(() => {
        gsap.from('.virtual-preview', {
            height: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.hero',
                start: '80%',
                end: '+=50%',
                scrub: true,
                // markers: true,
            },
        })
    }, [])
    return (
        <div className="virtual-tour">
            <div className={'images'}>
                <div className="image-small">
                    <Image
                        alt={'preview'}
                        src={`/assets/img/preview-virtual1.jpg`}
                        width={1800}
                        height={700}
                        className="image-preview virtual-preview"
                        priority
                    />
                    <div className={'image-opacity virtual-preview'}></div>
                </div>
                <div className="image-large">
                    <Image
                        alt={'preview'}
                        src={`/assets/img/preview-virtual3.jpg`}
                        width={1800}
                        height={700}
                        className="image-preview virtual-preview"
                        priority
                    />
                    <div className={'image-opacity virtual-preview'}></div>
                </div>
                <div className="image-small">
                    <Image
                        alt={'preview'}
                        src={`/assets/img/preview-virtual2.jpg`}
                        width={1800}
                        height={700}
                        className="image-preview virtual-preview"
                        priority
                    />
                    <div className={'image-opacity virtual-preview'}></div>
                </div>
            </div>
            <div className="text-showroom">
                <h2 className={'text-leading'}>
                    Showroom <br />
                    <span className={'text-[#A5171B]'}>Virtual</span> Tour
                </h2>
            </div>
        </div>
    )
}
