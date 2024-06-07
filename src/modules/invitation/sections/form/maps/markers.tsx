import mapboxgl from 'mapbox-gl'
import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { MapInvitation } from '.'
import { getMarkers } from '../markers'

interface MarkerProps {
    map: MapInvitation
    type: 'all' | 'office' | 'driver' | 'non-driver'
}

export default function Markers({ type, map }: MarkerProps) {
    const markers = useMemo(() => {
        if (map.markers?.length) {
            map.markers.forEach(marker => marker.remove())
        }

        const data = getMarkers(type)

        const mapMarkers = data.map(marker => {
            const mark = new mapboxgl.Marker({ color: marker.color })

            mark.setLngLat([marker.longitude, marker.latitude])
            mark.addTo(map)

            if (!map.markers?.length) {
                map.markers = [mark]
            } else {
                map.markers.push(mark)
            }

            return {
                parent: mark.getElement(),
                children: marker.element,
                marker: mark,
            }
        })

        return mapMarkers
    }, [type, map])

    return (
        <>
            {markers?.map(marker => {
                return createPortal(marker.children, marker.parent)
            })}
        </>
    )
}
