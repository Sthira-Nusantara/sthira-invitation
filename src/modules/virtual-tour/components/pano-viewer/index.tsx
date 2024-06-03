import { PanoViewer as PanoViewer360, PanoViewerOptions } from '@egjs/view360'
import gsap from 'gsap'
import { ForwardedRef, PropsWithChildren, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import styles from '../../styles/virtual-tour.module.css'
import { setHotspotOffset } from './setHotspot'

export interface PanoViewerProps extends Partial<PanoViewerOptions>, PropsWithChildren {
    hotspots?: boolean
}

function PanoViewerComponent(props: PanoViewerProps, ref: ForwardedRef<PanoViewer360>) {
    const viewRef = useRef<HTMLDivElement>(null)
    const loadingRef = useRef<HTMLDivElement>(null)
    const hotspotsRef = useRef<HTMLDivElement>(null)

    const [panoViewer, setPanoViewer] = useState<PanoViewer360>()

    const panoOptions: Partial<PanoViewerOptions> = {
        projectionType: 'panorama',
        fov: 0,
        yaw: 0,
        useZoom: false,
        ...props,
    }

    useEffect(() => {
        const viewer = init(panoOptions)
        return () => {
            viewer?.destroy?.()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!panoOptions?.image || !panoViewer) {
            return
        }
        const viewer = init(panoOptions)
        return () => {
            viewer?.destroy?.()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [panoOptions.image])

    useEffect(() => {
        if (!panoViewer) {
            return
        }
        setHotspotOffsets(panoViewer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.children, props.hotspots])

    useImperativeHandle(ref, () => panoViewer as PanoViewer360, [panoViewer])

    function init(panoOptions: Partial<PanoViewerOptions>) {
        const container = viewRef.current as HTMLDivElement
        if (!container) {
            return
        }

        gsap.to(hotspotsRef.current, { autoAlpha: 0, duration: 0 })
        gsap.to(loadingRef.current, { autoAlpha: 1, duration: 0.5, display: 'flex' })
        panoViewer?.destroy?.()

        const viewer = new PanoViewer360(container, panoOptions)

        setHotspotOffsets(viewer)
        viewer.on('viewChange', function () {
            setHotspotOffsets(viewer)
        })

        viewer.on('ready', function () {
            gsap.to(loadingRef.current, { autoAlpha: 0, duration: 0.5, display: 'none' })
            gsap.to(hotspotsRef.current, { autoAlpha: 1, duration: 0.5 })
            viewer.updateViewportDimensions()
        })

        window.addEventListener('resize', function () {
            viewer.updateViewportDimensions()
            setHotspotOffsets(viewer)
        })

        setPanoViewer(viewer)

        return viewer
    }

    function setHotspotOffsets(viewer: PanoViewer360) {
        const container = viewRef.current as HTMLDivElement
        if (!container) {
            return
        }

        const hotspotsContainerList = container.querySelectorAll(`.${styles.hotspots}`)
        const hotspotsContainer = hotspotsContainerList.item(0)

        if (!hotspotsContainer) {
            return
        }

        const hotspotsList = hotspotsContainer.querySelectorAll(`.${styles.hotspot}`)
        const hotspots = Array.from(hotspotsList) as HTMLElement[]

        hotspots.forEach(hotspot => {
            setHotspotOffset(hotspot, viewer, container)
        })
    }

    return (
        <div ref={viewRef} className="w-full h-full relative overflow-hidden">
            <div className="opacity-0" ref={hotspotsRef}>
                {props.hotspots ? props.children : <></>}
            </div>

            <div
                className="absolute inset-0 hidden opacity-0 justify-center items-center bg-black z-50"
                ref={loadingRef}
            >
                <div className="text-white text-xl">
                    Loading
                    <span className="animate-pulse">...</span>
                </div>
            </div>
        </div>
    )
}
PanoViewerComponent.displayName = 'PanoViewer'

export { PanoViewer360 }

const PanoViewer = forwardRef(PanoViewerComponent)
export default PanoViewer
