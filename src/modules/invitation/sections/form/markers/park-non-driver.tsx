import { useEffect, useRef } from 'react'

export default function ParkNonDriverMarker() {
    const markerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onClick = () => {
            const a = document.createElement('a')
            a.href = `https://maps.app.goo.gl/oe19J6t3GKws4H8f9`
            a.target = '_blank'
            a.rel = 'noreferrer'
            a.click()
        }
        markerRef.current?.parentElement?.addEventListener('click', onClick)

        return () => {
            markerRef.current?.parentElement?.removeEventListener('click', onClick)
        }
    }, [])

    return (
        <div className="bg-blue-600 p-1 rounded block absolute -left-6 mx-auto -bottom-10" ref={markerRef}>
            <p className="text-white text-xs whitespace-nowrap font-bold text-center">
                Lokasi Parkir <br /> <span>(Tanpa Supir)</span>
            </p>
        </div>
    )
}
