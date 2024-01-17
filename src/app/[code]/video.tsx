import { useEffect, useRef, useState } from 'react'
import YouTubePlayer from 'youtube-player'

const handleExitFullscreen = async (document: Document): Promise<void> => {
    const doc = document as any
    if (doc.exitFullscreen) {
        return doc.exitFullscreen()
    } else if (doc.mozCancelFullScreen) {
        /* Firefox */
        return doc.mozCancelFullScreen()
    } else if (doc.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        return doc.webkitExitFullscreen()
    } else if (doc.msExitFullscreen) {
        /* IE/Edge */
        return doc.msExitFullscreen()
    }
}

const handleFullScreen = async (element: HTMLElement): Promise<void> => {
    const el = element as any
    if (el.requestFullscreen) {
        return el.requestFullscreen()
    } else if (typeof el.mozRequestFullScreen === 'function') {
        /* Firefox */
        return el.mozRequestFullScreen()
    } else if (typeof el.webkitRequestFullscreen === 'function') {
        /* Chrome, Safari and Opera */
        return el.webkitRequestFullscreen()
    } else if (typeof el.msRequestFullscreen === 'function') {
        /* IE/Edge */
        return el.msRequestFullscreen()
    }
}

type IYoutubePlayer = ReturnType<typeof YouTubePlayer>

export default function Video({ onVideoEnded, play }: { play: boolean; onVideoEnded?: () => Promise<void> }) {
    const youtubeRef = useRef<HTMLDivElement>(null)
    const youtubeWrapperRef = useRef<HTMLDivElement>(null)

    const [player, setPlayer] = useState<IYoutubePlayer>()

    useEffect(() => {
        if (play) playVideo()
        else player?.stopVideo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [play])

    const playVideo = async () => {
        if (!youtubeRef.current || !youtubeWrapperRef.current) return

        const player = YouTubePlayer(youtubeRef.current!, {
            videoId: 'yabDCV4ccQs',
            height: '100%',
            width: '100%',
        })

        player.on('stateChange', async function (event) {
            // '-1': 'unstarted',
            // '0': 'ended',
            // '1': 'playing',
            // '2': 'paused',
            // '3': 'buffering',
            // '5': 'video cued'

            if (event.data === 0) {
                await handleExitFullscreen(document).catch(console.error)
                await onVideoEnded?.()
            }
        })

        setPlayer(player)

        await player.playVideo()
        await handleFullScreen(youtubeWrapperRef.current!)
    }

    return (
        <div ref={youtubeWrapperRef}>
            <div ref={youtubeRef} />
        </div>
    )
}
