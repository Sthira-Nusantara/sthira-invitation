import { TourPoints } from './TourPoints'

export interface PointProps {
    setActivePoint: (point: TourPoints) => void
    activePoint: TourPoints
    hotspots?: boolean
}
