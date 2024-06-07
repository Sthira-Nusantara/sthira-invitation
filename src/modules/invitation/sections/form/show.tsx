import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import Maps from './maps'
import { TypeAttendance } from './types/attend'

export interface ShowMapsProps {
    attendance: TypeAttendance
    setAttendance: (attendance: TypeAttendance) => void
}

function MapsAttendance({ attendance }: ShowMapsProps) {
    const getType = () => {
        if (attendance === 'attend-with-driver') return 'driver'
        if (attendance === 'attend-without-driver') return 'non-driver'
        return 'all'
    }

    return (
        <div className="flex-1 flex items-center flex-col justify-center px-3">
            <div className="w-full">
                <p className="text-left text-3xl font-eczar">Denah Lokasi Acara</p>
            </div>
            <div className="w-full flex-1 rounded-xl overflow-hidden my-3">
                <Maps type={getType()} />
            </div>
            <div className="w-full">
                <p className="text-xs text-gray-400 flex gap-x-1">
                    <span className="text-red-600">*</span>
                    <span>Klik pada marker untuk melihat detail lokasi acara</span>
                </p>
                <p className="text-xs text-gray-400 flex gap-x-1">
                    <span className="text-red-600">*</span>
                    <span>Lokasi parkir bagi yang menggunakan driver pribadi adalah parkiran paralel</span>
                </p>
            </div>
        </div>
    )
}

export default function ShowMaps({ attendance, setAttendance }: ShowMapsProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.from(wrapperRef.current, { opacity: 0, duration: 3 })
    }, [])

    return (
        <div className="container mx-auto flex flex-col h-full" ref={wrapperRef}>
            {attendance !== 'not-attend' && (
                <div className="w-full px-4 mb-4">
                    <p className="text-center italic">Apakah Anda menggunakan driver pribadi?</p>

                    <div className="w-full md:w-1/2 mx-auto flex gap-x-2 mt-4">
                        <button
                            className={`w-1/2 px-3 py-2 ${attendance === 'attend-with-driver' ? 'bg-red-600' : 'bg-gray-400'} text-white rounded-full mx-auto`}
                            onClick={() => setAttendance('attend-with-driver')}
                        >
                            Iya
                        </button>
                        <button
                            className={`w-1/2 px-3 py-2 ${attendance === 'attend-without-driver' ? 'bg-red-600' : 'bg-gray-400'} text-white rounded-full mx-auto`}
                            onClick={() => setAttendance('attend-without-driver')}
                        >
                            Tidak
                        </button>
                    </div>
                </div>
            )}
            {attendance !== 'attend' && <MapsAttendance attendance={attendance} setAttendance={setAttendance} />}
        </div>
    )
}
