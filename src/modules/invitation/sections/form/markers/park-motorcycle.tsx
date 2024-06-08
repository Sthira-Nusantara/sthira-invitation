import { useEffect, useRef } from 'react'
import { BaseMarkerProps } from '.'

export default function ParkMotorcycleMarker({ isGeneral }: BaseMarkerProps) {
    const markerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onClick = () => {
            const a = document.createElement('a')
            a.href = `https://maps.app.goo.gl/LmoCtV6VSbensm17A`
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
                'bg-yellow-600 p-1 rounded block absolute mx-auto',
                isGeneral ? '-bottom-0 -left-[5.3rem]' : '-bottom-6 -left-8',
            ].join(' ')}
            ref={markerRef}
        >
            <p className="text-white text-xs whitespace-nowrap font-bold text-center">
                Lokasi Parkir
                {isGeneral && (
                    <>
                        {' '}
                        <br />
                        <span>Motor</span>
                    </>
                )}
            </p>
        </div>
    )
}
