import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons'
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
                image: '/assets/virtual-tour/floor-4/0.jpg',
                yaw: 15,
                children: (
                    <>
                        <Hotspots>
                            <Hotspot xAxis={-90} yAxis={-5} onClick={() => setIndex(3)} />
                            <Hotspot xAxis={120} yAxis={-1} onClick={() => setIndex(1)} />
                            <Hotspot xAxis={63} yAxis={1} onClick={() => props.setActivePoint(TourPoints.FLOOR_3)}>
                                <div className="animate-bounce flex flex-col justify-center items-center">
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className="text-red-500 rotate-45 w-12"
                                        size="4x"
                                    />
                                    <p className="text-orange-500 text-sm">Go to downstair</p>
                                </div>
                            </Hotspot>
                        </Hotspots>
                    </>
                ),
            },
            {
                image: '/assets/virtual-tour/floor-4/1.jpg',
                yaw: 50,
                children: (
                    <>
                        <Hotspots>
                            <Hotspot xAxis={77} yAxis={-2} onClick={() => setIndex(2)} />
                            <Hotspot xAxis={8} yAxis={0} onClick={() => setIndex(4)} />
                            <Hotspot xAxis={-53} yAxis={-7} onClick={() => setIndex(3)} />
                            <Hotspot xAxis={90} yAxis={-4} onClick={() => props.setActivePoint(TourPoints.FLOOR_3)}>
                                <div className="animate-bounce flex flex-col justify-center items-center">
                                    <FontAwesomeIcon icon={faArrowDown} className="text-red-500 w-12" size="4x" />
                                    <p className="text-orange-500 text-sm">Go to downstair</p>
                                </div>
                            </Hotspot>
                        </Hotspots>
                    </>
                ),
            },
            {
                image: '/assets/virtual-tour/floor-4/2.jpg',
                children: (
                    <>
                        <Hotspots>
                            <Hotspot xAxis={-12} yAxis={-8} onClick={() => setIndex(1)} />
                            <Hotspot xAxis={92} yAxis={-2} onClick={() => setIndex(3)} />
                            <Hotspot xAxis={125} yAxis={2} onClick={() => setIndex(4)} />
                            <Hotspot xAxis={50} yAxis={-4} onClick={() => setIndex(0)} />
                        </Hotspots>
                    </>
                ),
            },
            {
                image: '/assets/virtual-tour/floor-4/3.jpg',
                yaw: 150,
                children: (
                    <>
                        <Hotspots>
                            <Hotspot xAxis={-70} yAxis={-4} onClick={() => setIndex(4)} />
                            <Hotspot xAxis={84} yAxis={0.5} onClick={() => setIndex(1)} />
                            <Hotspot xAxis={25} yAxis={-0.5} onClick={() => setIndex(2)} />
                        </Hotspots>
                    </>
                ),
            },
            {
                image: '/assets/virtual-tour/floor-4/4.jpg',
                yaw: -60,
                children: (
                    <>
                        <Hotspots>
                            <Hotspot xAxis={78} yAxis={-10} onClick={() => setIndex(3)} />
                            <Hotspot xAxis={-81.5} yAxis={-1.5} onClick={() => setIndex(2)} />
                            <Hotspot xAxis={-48} yAxis={-4} onClick={() => setIndex(1)} />
                            <Hotspot xAxis={7} yAxis={-4} onClick={() => setIndex(0)} />
                            <Hotspot xAxis={-114} yAxis={-7} onClick={() => props.setActivePoint(TourPoints.FLOOR_3)}>
                                <div className="animate-bounce flex flex-col justify-center items-center">
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className="text-red-500 rotate-45 w-12"
                                        size="4x"
                                    />
                                    <p className="text-orange-500 text-sm">Go to downstair</p>
                                </div>
                            </Hotspot>
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
