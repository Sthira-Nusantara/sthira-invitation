import { useEffect, useRef } from 'react'
import { BaseMarkerProps } from '.'

export default function ParkWithDriverMarker({ isGeneral }: BaseMarkerProps) {
    const markerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onClick = () => {
            const a = document.createElement('a')
            a.href = `https://maps.app.goo.gl/pmtnpEgZhJAYsVTq5`
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
        <div
            className={[
                'bg-green-600 p-1 rounded block absolute mx-auto',
                isGeneral ? '-bottom-10 -left-11' : '-bottom-6 -left-12',
            ].join(' ')}
            ref={markerRef}
        >
            <p className="text-white text-xs whitespace-nowrap font-bold text-center">
                Lokasi Parkir
                {!isGeneral && <span> (50 M)</span>}
                {isGeneral && (
                    <>
                        <br />
                        <span style={{ fontSize: '0.65rem' }}>(Menggunakan Supir)</span>{' '}
                    </>
                )}
            </p>
        </div>
    )
}
