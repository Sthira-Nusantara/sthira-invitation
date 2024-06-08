import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { PropsWithChildren, useRef, useState } from 'react'
import Maps from './maps'
import { MarkerType } from './markers'
import { TypeAttendance } from './types/attend'

export interface ShowMapsProps {
    attendance: TypeAttendance
    setAttendance: (attendance: TypeAttendance) => void
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
                    <span>Klik pada marker untuk melihat detail lokasi acara</span>
                </p>
                <p className="text-xs text-gray-400 flex gap-x-1">
                    <span className="text-red-600">*</span>
                    <span>Lokasi parkir bagi yang menggunakan supir pribadi adalah parkiran paralel</span>
                </p>
            </div>
        </div>
    )
}

function Button({ isActive, children, onClick }: PropsWithChildren<{ isActive: boolean; onClick: () => void }>) {
    return (
        <button
            className={`w-1/2 px-3 py-1 ${isActive ? 'bg-red-600' : 'bg-gray-400 hover:bg-gray-500'} text-white rounded-full mx-auto`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default function ShowMaps({ attendance }: ShowMapsProps) {
    const [vehicleType, setVehicleType] = useState<MarkerType | 'car'>()
    const wrapperRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.from(wrapperRef.current, { opacity: 0, duration: 2 })
    }, [])

    const isCar = !!vehicleType && vehicleType !== 'motorcycle'
    const renderMap = (attendance === 'not-attend' && vehicleType !== 'car') || (vehicleType && vehicleType !== 'car')

    return (
        <div className="container mx-auto flex flex-col h-full" ref={wrapperRef}>
            {attendance === 'attend' && (
                <div className="w-full px-4">
                    <p className="text-center italic text-sm">Pilih jenis kendaraan yang anda pakai</p>

                    <div className="w-full md:w-1/2 mx-auto flex gap-x-2 mt-2">
                        <Button isActive={vehicleType === 'motorcycle'} onClick={() => setVehicleType('motorcycle')}>
                            Motor
                        </Button>
                        <Button isActive={isCar} onClick={() => setVehicleType('car')}>
                            Mobil
                        </Button>
                    </div>
                </div>
            )}
            {isCar && (
                <div className="w-full px-4 mt-2">
                    <p className="text-center italic text-sm">
                        Apakah Anda mengendarai kendaraan <br className="md:hidden" /> sendiri (tanpa supir)?
                    </p>

                    <div className="w-full md:w-1/2 mx-auto flex gap-x-2 mt-2">
                        <Button isActive={vehicleType === 'driver'} onClick={() => setVehicleType('driver')}>
                            Iya
                        </Button>
                        <Button isActive={vehicleType === 'non-driver'} onClick={() => setVehicleType('non-driver')}>
                            Tidak
                        </Button>
                    </div>
                </div>
            )}
            {renderMap && <MapsAttendance vehicleType={vehicleType || 'all'} />}
        </div>
    )
}
