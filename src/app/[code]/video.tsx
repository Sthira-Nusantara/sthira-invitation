import { useEffect, useRef, useState } from 'react'
import YouTubePlayer from 'youtube-player'
import styles from './styles/video.module.scss'

type IYoutubePlayer = ReturnType<typeof YouTubePlayer>

export default function Video({
    onVideoEnded,
    play,
}: {
    play: boolean
    onVideoEnded?: (player: IYoutubePlayer) => Promise<void> | void
}) {
    const youtubeRef = useRef<HTMLDivElement>(null)
    const youtubeWrapperRef = useRef<HTMLDivElement>(null)

    const [player, setPlayer] = useState<IYoutubePlayer>()

    useEffect(() => {
        if (play) playVideo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [play])

    const playVideo = async () => {
        if (!youtubeRef.current || !youtubeWrapperRef.current) return

        let localPlayer = player

        if (!localPlayer) {
            localPlayer = YouTubePlayer(youtubeRef.current!, {
                videoId: 'yabDCV4ccQs',
                height: '100%',
                width: '100%',
            })

            localPlayer.on('stateChange', async function (event) {
                // '-1': 'unstarted',
                // '0': 'ended',
                // '1': 'playing',
                // '2': 'paused',
                // '3': 'buffering',
                // '5': 'video cued'

                if (event.data === 0) {
                    await onVideoEnded?.(localPlayer!)
                }
            })

            setPlayer(localPlayer)
        }

        await localPlayer.unMute()
        await localPlayer.playVideo()
    }

    return (
        <div ref={youtubeWrapperRef} className={styles.wrapper}>
            <div ref={youtubeRef} />
        </div>
    )
}
