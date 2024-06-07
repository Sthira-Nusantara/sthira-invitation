import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useRef } from 'react'
import { MenuBaseProps } from '../../types/menu-base-props'
import VideoFrame, { VideoFrameElement } from './frame'

export default function InvitationVideo({}: MenuBaseProps) {
    const videoRef = useRef<VideoFrameElement>(null)

    useGSAP(() => {
        const scrollTrigger = ScrollTrigger.create({
            trigger: videoRef.current,
            start: 'top-=100 top',
            end: 'top-=100 top',
            // markers: true,
            onEnter: () => {
                videoRef.current?.playVideo?.()
            },
        })

        return () => {
            scrollTrigger.kill()
        }
    }, [])

    return (
        <section className="w-screen h-screen overflow-hidden flex items-center justify-center invitation" id="video">
            <div className="container mx-auto h-full">
                <VideoFrame
                    ref={videoRef}
                    onVideoEnded={async player => {
                        console.log('ONEND')
                        await player.mute()
                        await player.playVideo()
                    }}
                />
            </div>
        </section>
    )
}
