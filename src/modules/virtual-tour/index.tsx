import { useState } from 'react'
import Floor3 from './points/floor-3'
import Floor4 from './points/floor-4'
import { PointProps } from './types/PointProps'
import { TourPoints } from './types/TourPoints'

interface VirtualTourProps {
    point?: TourPoints
    /**
     * Show hotspots on the virtual tour
     * @default true
     */
    hotspots?: boolean
    onPointChange?: (point: TourPoints, oldPoint: TourPoints) => void
}

export default function VirtualTour(props: VirtualTourProps) {
    const [point, setPoint] = useState<TourPoints>(props.point || TourPoints.FLOOR_4)

    const pointProps: PointProps = {
        activePoint: point,
        setActivePoint: (newPoint: TourPoints) => {
            setPoint(newPoint)
            props.onPointChange?.(newPoint, point)
        },
        hotspots: props.hotspots,
    }

    switch (point) {
        case TourPoints.FLOOR_4:
            return <Floor4 {...pointProps} />
        case TourPoints.FLOOR_3:
            return <Floor3 {...pointProps} />
        default:
            return <Floor4 {...pointProps} />
    }
}
