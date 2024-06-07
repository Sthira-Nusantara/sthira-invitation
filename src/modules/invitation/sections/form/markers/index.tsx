import {
    DRIVER_PARK_LAT,
    DRIVER_PARK_LONG,
    NON_DRIVER_PARK_LAT,
    NON_DRIVER_PARK_LONG,
    OFFICE_LAT,
    OFFICE_LONG,
} from '../data/coordinates'
import OfficeMarker from './office'
import ParkWithDriverMarker from './park-driver'
import ParkNonDriverMarker from './park-non-driver'

interface Marker {
    latitude: number
    longitude: number
    element: React.ReactNode
    color: string
}

export interface BaseMarkerProps {
    isGeneral?: boolean
}

export const getMarkers = (type: 'all' | 'driver' | 'non-driver' | 'office') => {
    const data: Marker[] = []

    const baseProps: BaseMarkerProps = {
        isGeneral: type === 'all',
    }

    data.push({
        latitude: OFFICE_LAT,
        longitude: OFFICE_LONG,
        element: <OfficeMarker {...baseProps} />,
        color: '#a5171b',
    })

    if (type === 'all' || type === 'driver') {
        data.push({
            latitude: DRIVER_PARK_LAT,
            longitude: DRIVER_PARK_LONG,
            element: <ParkWithDriverMarker {...baseProps} />,
            color: '#16a34a',
        })
    }

    if (type === 'all' || type === 'non-driver') {
        data.push({
            latitude: NON_DRIVER_PARK_LAT,
            longitude: NON_DRIVER_PARK_LONG,
            element: <ParkNonDriverMarker {...baseProps} />,
            color: '#2563EB',
        })
    }

    return data
}
