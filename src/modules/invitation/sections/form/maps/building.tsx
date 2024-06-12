import { MarkerBankPermata, MarkerBuilding, MarkerPUPR } from '@/assets/icons'
import mapboxgl from 'mapbox-gl'
import { ReactNode, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { MapInvitation } from '.'

interface MarkerProps {
    map: MapInvitation
}

interface BuildingData {
    name: string
    latitude: number
    longitude: number
    element: ReactNode
}

const data: BuildingData[] = [
    {
        name: 'Bank Permata',
        latitude: -6.143711816814015,
        longitude: 106.83135180872402,
        element: (
            <div className="max-w-36 flex items-center flex-col text-slate-200">
                <MarkerBankPermata />
                <p className="text-xs">Bank Permata</p>
            </div>
        ),
    },
    {
        name: 'GRHA 317',
        latitude: -6.143804840251852,
        longitude: 106.83170906197131,
        element: (
            <div className="max-w-36 flex items-center flex-col">
                <MarkerBuilding />
                <p className="text-white text-xs">GRHA 137</p>
            </div>
        ),
    },
    {
        name: 'Balai Material dan Peralatan Konstruksi',
        latitude: -6.144330627755832,
        longitude: 106.83249225866957,
        element: (
            <div className="max-w-36 flex items-center flex-col text-slate-200">
                <MarkerPUPR />
                <p className="text-xs text-center">Balai Material dan Peralatan Konstruksi</p>
            </div>
        ),
    },
]

export default function Buildings({ map }: MarkerProps) {
    const buildings = useMemo(() => {
        if (map.buildings?.length) {
            map.buildings.forEach(marker => marker.remove())
        }

        const mapMarkers = data.map(building => {
            const mark = new mapboxgl.Marker({ element: document.createElement('div') })

            mark.setLngLat([building.longitude, building.latitude])
            mark.addTo(map)

            if (!map.buildings?.length) {
                map.buildings = [mark]
            } else {
                map.buildings.push(mark)
            }

            return {
                parent: mark.getElement(),
                children: building.element,
                marker: mark,
            }
        })

        return mapMarkers
    }, [map])

    return (
        <>
            {buildings?.map(marker => {
                return createPortal(marker.children, marker.parent)
            })}
        </>
    )
}
