import mapboxgl, { GeoJSONSource } from 'mapbox-gl'
import {
    DRIVER_PARK_LAT,
    DRIVER_PARK_LONG,
    NON_DRIVER_PARK_LAT,
    NON_DRIVER_PARK_LONG,
    OFFICE_LAT,
    OFFICE_LONG,
} from '../data/coordinates'
import { MarkerType } from '../markers'

export async function renderRoute(map: mapboxgl.Map, markerType: MarkerType) {
    if (markerType === 'all' || markerType === 'office' || markerType === 'motorcycle' || !map) {
        return
    }

    const end: [number, number, string] = [DRIVER_PARK_LAT, DRIVER_PARK_LONG, '#16a34a']

    if (markerType === 'non-driver') {
        end[0] = NON_DRIVER_PARK_LAT
        end[1] = NON_DRIVER_PARK_LONG
        end[2] = '#2563EB'
    }

    const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${end[1]},${end[0]};${OFFICE_LONG},${OFFICE_LAT}?alternatives=false&annotations=distance&continue_straight=true&geometries=geojson&overview=full&steps=false&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' },
    )
    const json = await query.json()
    const data = json.routes[0]
    const route = data.geometry.coordinates
    const geojson: GeoJSON.Feature<GeoJSON.Geometry> = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: route,
        },
    }

    try {
        const source = map.getSource('route') as GeoJSONSource
        if (source) {
            source.setData(geojson)
        } else {
            map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: geojson,
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': end[2],
                    'line-width': 5,
                },
            })
        }
    } catch (error) {}
}
