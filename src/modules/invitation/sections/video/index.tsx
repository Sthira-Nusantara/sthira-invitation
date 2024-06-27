import { useRef } from 'react'
import { MenuBaseProps } from '../../types/menu-base-props'
import VideoFrame, { VideoFrameElement } from './frame'

export default function InvitationVideo({}: MenuBaseProps) {
    const videoRef = useRef<VideoFrameElement>(null)

    return (
        <section className="w-screen h-screen overflow-hidden flex items-center justify-center invitation" id="video">
            <div className="container mx-auto h-full">
                <VideoFrame
                    ref={videoRef}
                    onVideoEnded={async player => {
                        await player.mute()
                        await player.playVideo()
                    }}
                />
            </div>
        </section>
    )
}
