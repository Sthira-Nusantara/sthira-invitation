import { RefObject, useState } from 'react'
import { MenuBaseProps } from '../../types/menu-base-props'
import VideoFrame, { IYoutubePlayer, VideoFrameElement } from './frame'

interface InvitationVideoProps extends MenuBaseProps {
    videoRef: RefObject<VideoFrameElement>
}

export default function InvitationVideo({ videoRef }: InvitationVideoProps) {
    const [, setPlayed] = useState(false)

    // useGSAP(() => {
    //     const scrollTrigger = ScrollTrigger.create({
    //         trigger: videoRef.current,
    //         start: 'top-=100 top',
    //         end: 'top-=100 top',
    //         // markers: true,
    //         onEnter: () => {
    //             videoRef.current?.playVideo?.()
    //         },
    //     })

    //     return () => {
    //         scrollTrigger.kill()
    //     }
    // }, [])

    const onVideoEnded = async (player: IYoutubePlayer) => {
        await player.mute()
        await player.playVideo()
        setPlayed(prevState => {
            if (!prevState) {
                document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })
            }
            return true
        })
    }

    return (
        <section className="w-screen h-screen overflow-hidden flex items-center justify-center invitation" id="video">
            <div className="container mx-auto h-full">
                <VideoFrame
                    ref={videoRef}
                    onVideoEnded={player => {
                        onVideoEnded(player)
                    }}
                />
            </div>
        </section>
    )
}
