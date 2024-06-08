import { MAPBOX_TOKEN } from '@/config/config'
import mapboxgl, { Map } from 'mapbox-gl'
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { CENTER_LAT, CENTER_LONG } from '../data/coordinates'
import { MarkerType } from '../markers'
import Markers from './markers'

export interface MapInvitation extends mapboxgl.Map {
    markers?: mapboxgl.Marker[]
}

interface MapsProp {
    type: MarkerType
}

function MapsComponent({ type }: MapsProp, ref: ForwardedRef<MapInvitation>) {
    const [map, setMap] = useState<MapInvitation>()

    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_TOKEN

        const map = new Map({
            container: 'map-invitation',
            center: [CENTER_LONG, CENTER_LAT],
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            zoom: 17,
            minZoom: 15.5,
            maxZoom: 20,
        })

        map.addControl(
            new mapboxgl.NavigationControl({
                showCompass: false,
                showZoom: true,
            }),
            'bottom-right',
        )

        setMap(map)

        const resizeObserver = new ResizeObserver(() => {
            map.resize()
        })

        const wrapper = document.getElementById('map-invitation')
        if (wrapper) {
            resizeObserver.observe(wrapper)
        }

        return () => {
            if (wrapper) {
                resizeObserver.unobserve(wrapper)
            }
            map.remove()
        }
    }, [])

    useImperativeHandle(
        ref,
        () => {
            return map || ({} as any)
        },
        [],
    )

    return (
        <>
            <div className="w-full h-full" id="map-invitation" />
            {map && <Markers map={map} type={type} />}
        </>
    )
}

const Maps = forwardRef(MapsComponent)
export default Maps
