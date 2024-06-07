import { MAPBOX_TOKEN } from '@/config/config'
import mapboxgl, { Map } from 'mapbox-gl'
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { MenuBaseProps } from '../../../types/menu-base-props'
import { CENTER_LAT, CENTER_LONG } from '../data/coordinates'
import Markers from './markers'

export interface MapInvitation extends mapboxgl.Map {
    markers?: mapboxgl.Marker[]
}

function MapsComponent({}: MenuBaseProps, ref: ForwardedRef<MapInvitation>) {
    const [map, setMap] = useState<MapInvitation>()

    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_TOKEN

        const map = new Map({
            container: 'map-invitation',
            center: [CENTER_LONG, CENTER_LAT],
            style: 'mapbox://styles/mapbox/satellite-v9',
            zoom: 17,
            minZoom: 17,
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
            {map && <Markers map={map} type="all" />}
        </>
    )
}

const Maps = forwardRef(MapsComponent)
export default Maps
