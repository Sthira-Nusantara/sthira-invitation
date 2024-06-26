import { INVITATION_YOUTUBE_ID } from '@/config/config'
import { handleExitFullscreen, handleFullScreen, rotateLandscape } from '@/utils/helpers'
import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react'
import YouTubePlayer from 'youtube-player'

export type IYoutubePlayer = ReturnType<typeof YouTubePlayer>

interface VideoFrameProps {
    onVideoEnded?: (player: IYoutubePlayer) => Promise<void> | void
}

export interface VideoFrameElement extends HTMLDivElement {
    playVideo?: (isFullScreen?: boolean) => Promise<void>
    player?: IYoutubePlayer
}

function VideoFrameRef({ onVideoEnded }: VideoFrameProps, ref: ForwardedRef<VideoFrameElement>) {
    const youtubeRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<VideoFrameElement>(null)

    useImperativeHandle(
        ref,
        () => {
            if (!wrapperRef.current) {
                return {} as any
            }

            let localPlayer = wrapperRef.current.player

            if (!localPlayer) {
                localPlayer = YouTubePlayer(wrapperRef.current, {
                    videoId: INVITATION_YOUTUBE_ID,
                    height: '100%',
                    width: '100%',
                    playerVars: {
                        controls: 1,
                    },
                })

                localPlayer.on('stateChange', async function (event) {
                    // '-1': 'unstarted',
                    // '0': 'ended',
                    // '1': 'playing',
                    // '2': 'paused',
                    // '3': 'buffering',
                    // '5': 'video cued'

                    if (event.data === 0) {
                        await handleExitFullscreen(document)
                        await onVideoEnded?.(localPlayer as IYoutubePlayer)
                    }
                })
            }

            wrapperRef.current.player = localPlayer
            wrapperRef.current.playVideo = async isFullScreen => {
                if (!localPlayer) {
                    return
                }

                const iframe = await localPlayer.getIframe()

                if (isFullScreen) {
                    await handleFullScreen(iframe)
                    await rotateLandscape()
                }

                await localPlayer.unMute()
                await localPlayer.playVideo()
            }

            return wrapperRef.current
        },
        [wrapperRef.current],
    )

    return (
        <div className="w-full h-full" ref={wrapperRef}>
            <div ref={youtubeRef} />
        </div>
    )
}

const VideoFrame = forwardRef(VideoFrameRef)

export default VideoFrame
