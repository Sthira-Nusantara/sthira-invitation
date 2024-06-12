import mapboxgl, { GeoJSONSource } from 'mapbox-gl'
import { DRIVER_PARK_ROUTE, NON_DRIVER_PARK_ROUTE } from '../data/coordinates'
import { MarkerType } from '../markers'

const getGeoJsonSource = (map: mapboxgl.Map) => {
    try {
        return map.getSource('route') as GeoJSONSource
    } catch (error) {
        return null
    }
}

export function renderRoute(map: mapboxgl.Map, markerType: MarkerType) {
    const source = getGeoJsonSource(map)

    if (markerType === 'all' || markerType === 'office' || markerType === 'motorcycle' || !map) {
        source?.setData({ type: 'FeatureCollection', features: [] })
        return
    }

    let color = '#16a34a'
    let coordinates = DRIVER_PARK_ROUTE
    if (markerType === 'non-driver') {
        color = '#2563EB'
        coordinates = NON_DRIVER_PARK_ROUTE
    }

    const geojson: GeoJSON.Feature<GeoJSON.Geometry> = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates,
        },
    }

    try {
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
                    'line-color': color,
                    'line-width': 5,
                    'line-opacity': 0.7,
                },
            })
        }
    } catch (error) {}
}
