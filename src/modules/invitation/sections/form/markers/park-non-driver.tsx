import { useEffect, useRef } from 'react'
import { BaseMarkerProps } from '.'

export default function ParkNonDriverMarker({ isGeneral }: BaseMarkerProps) {
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
        <div
            className={[
                'bg-blue-600 p-1 rounded block absolute mx-auto',
                isGeneral ? '-bottom-10 -left-6' : '-bottom-6 -left-6',
            ].join(' ')}
            ref={markerRef}
        >
            <p className="text-white text-xs whitespace-nowrap font-bold text-center">
                Lokasi Parkir
                {isGeneral && (
                    <>
                        {' '}
                        <br />
                        <span>(Tanpa Supir)</span>
                    </>
                )}
            </p>
        </div>
    )
}
