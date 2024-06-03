import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState } from 'react'
import MapIcon from './components/map'
import { networkDataMapped } from './data/network'
import { ZoneBaseProps } from './types/base-props'

export default function IndonesiaMap({ dataActive, setDataActive }: ZoneBaseProps) {
    const [provincesPath, setProvincesPath] = useState<SVGPathElement[]>([])

    useGSAP(() => {
        const provinces = gsap.utils.toArray<SVGPathElement>('.map-provinces')
        setProvincesPath(provinces)

        const filteredProvinces = provinces.filter(province => networkDataMapped[province.id])

        filteredProvinces.forEach(province => {
            province.addEventListener('mouseenter', () => setDataActive(networkDataMapped[province.id]))
            province.addEventListener('mouseleave', () => setDataActive(undefined))
            province.classList.add('cursor-pointer')
            province.dataset.network = 'true'
        })
    }, [])

    useGSAP(() => {
        if (!dataActive) {
            return unhighlight()
        }

        highlight(dataActive.id)
    }, [dataActive])

    const highlight = (id: string) => {
        provincesPath.forEach(path => {
            if (path.id !== id) {
                const isZone = path.dataset.network === 'true'
                return gsap.to(path, {
                    duration: 1,
                    opacity: 0.2,
                    attr: isZone ? { fill: '#9CA3AF', stroke: '#a5171b' } : undefined,
                })
            }

            path.dataset.active = 'true'
            gsap.to(path, {
                duration: 1,
                opacity: 1,
                attr: { fill: '#a5171b', stroke: 'white' },
            })
        })

        setDataActive(networkDataMapped[id])
    }

    const unhighlight = () => {
        provincesPath.forEach(path => {
            const isZone = path.dataset.network === 'true'
            path.dataset.active = 'false'
            gsap.to(path, {
                duration: 1,
                opacity: 1,
                attr: isZone ? { fill: '#a5171b', stroke: '#a5171b' } : undefined,
            })
        })

        setDataActive(undefined)
    }

    return <MapIcon />
}
