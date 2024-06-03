import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo, useState } from 'react'
import Hotspot from '../components/hotspot'
import Hotspots from '../components/hotspots'
import PanoViewer, { PanoViewerProps } from '../components/pano-viewer'
import { PointProps } from '../types/PointProps'
import { TourPoints } from '../types/TourPoints'

export default function Floor3(props: PointProps) {
    const [index, setIndex] = useState(0)
    const spots = useMemo<PanoViewerProps[]>(
        () => [
            {
                image: '/assets/virtual-tour/floor-3/0.jpg',
                yaw: 15,
                children: (
                    <>
                        <Hotspots>
                            <Hotspot xAxis={-15} yAxis={2} onClick={() => setIndex(2)} />
                            <Hotspot xAxis={60} yAxis={3} onClick={() => setIndex(1)} />
                        </Hotspots>
                    </>
                ),
            },
            {
                image: '/assets/virtual-tour/floor-3/1.jpg',
                yaw: -50,
                children: (
                    <>
                        <Hotspots>
                            <Hotspot xAxis={-85} yAxis={2} onClick={() => setIndex(0)} />
                            <Hotspot xAxis={50} yAxis={0} onClick={() => setIndex(2)} />
                            <Hotspot xAxis={125} yAxis={-5} onClick={() => setIndex(3)} />
                        </Hotspots>
                    </>
                ),
            },
            {
                image: '/assets/virtual-tour/floor-3/2.jpg',
                yaw: 40,
                children: (
                    <>
                        <Hotspots>
                            <Hotspot xAxis={5} yAxis={3} onClick={() => setIndex(3)} />
                            <Hotspot xAxis={74} yAxis={2} onClick={() => setIndex(1)} />
                        </Hotspots>
                    </>
                ),
            },
            {
                image: '/assets/virtual-tour/floor-3/3.jpg',
                yaw: 30,
                children: (
                    <>
                        <Hotspots>
                            <Hotspot xAxis={-65} yAxis={3} onClick={() => setIndex(1)} />
                            <Hotspot xAxis={53} yAxis={4} onClick={() => props.setActivePoint(TourPoints.FLOOR_4)}>
                                <div className="animate-bounce flex flex-col justify-center items-center">
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className="text-red-500 -rotate-45 w-12"
                                        size="4x"
                                    />
                                    <p className="text-orange-500 text-sm">Go to upstair</p>
                                </div>
                            </Hotspot>
                            <Hotspot xAxis={-34} yAxis={5} onClick={() => setIndex(0)} />
                        </Hotspots>
                    </>
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    return <PanoViewer {...spots[index]} hotspots={props.hotspots} />
}
