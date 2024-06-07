import { useEffect, useRef } from 'react'
import { BaseMarkerProps } from '.'

export default function OfficeMarker({}: BaseMarkerProps) {
    const markerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onClick = () => {
            const a = document.createElement('a')
            a.href = `https://maps.app.goo.gl/KuLjkrTYH9wrc46Z7`
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
        <div className="bg-red-600 p-1 rounded block absolute -left-6 mx-auto -top-6" ref={markerRef}>
            <p className="text-white text-xs whitespace-nowrap font-bold">Lokasi Acara</p>
        </div>
    )
}
