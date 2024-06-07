import { RefObject, useState } from 'react'
import { MenuBaseProps } from '../../types/menu-base-props'
import VideoFrame, { VideoFrameElement } from './frame'

interface InvitationVideoProps extends MenuBaseProps {
    videoRef: RefObject<VideoFrameElement>
}

export default function InvitationVideo({ videoRef }: InvitationVideoProps) {
    const [, setPlayed] = useState(false)

    return (
        <section className="w-screen h-screen overflow-hidden flex items-center justify-center invitation" id="video">
            <div className="container mx-auto h-full">
                <VideoFrame
                    ref={videoRef}
                    onVideoEnded={async player => {
                        await player.mute()
                        await player.playVideo()
                        setPlayed(prevState => {
                            if (!prevState) {
                                setTimeout(() => {
                                    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })
                                }, 1000)
                            }
                            return true
                        })
                    }}
                />
            </div>
        </section>
    )
}
