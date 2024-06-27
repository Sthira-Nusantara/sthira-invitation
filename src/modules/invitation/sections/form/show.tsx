import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import Maps from './maps'
import { MarkerType } from './markers'

export interface ShowMapsProps {
    vehicle: MarkerType
}

function MapsAttendance({ vehicleType }: { vehicleType: MarkerType }) {
    return (
        <div className="flex-1 flex items-center flex-col justify-center px-3 mt-4">
            <div className="w-full">
                <p className="text-left text-3xl font-eczar">Denah Lokasi Acara</p>
            </div>
            <div className="w-full flex-1 rounded-xl overflow-hidden my-3">
                <Maps type={vehicleType || 'all'} />
            </div>
            <div className="w-full">
                <p className="text-xs text-gray-400 flex gap-x-1">
                    <span className="text-red-600">*</span>
                    <span>Klik pada marker untuk melihat detail lokasi</span>
                </p>
                <p className="text-xs text-gray-400 flex gap-x-1">
                    <span className="text-red-600">*</span>
                    <span>Lokasi parkir bagi yang menggunakan supir pribadi adalah parkiran paralel</span>
                </p>
            </div>
        </div>
    )
}
export default function ShowMaps({ vehicle }: ShowMapsProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.from(wrapperRef.current, { opacity: 0, duration: 2 })
    }, [])

    return (
        <div className="container mx-auto flex flex-col h-full py-8" ref={wrapperRef}>
            <MapsAttendance vehicleType={vehicle} />
        </div>
    )
}
