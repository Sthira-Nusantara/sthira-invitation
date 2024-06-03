import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import MapIcon from '../zone/components/map'
import { networkData } from '../zone/data/network'

const cities = networkData.flatMap(d => d.cities || [])
const citiesMapped: [string, string][] = []
for (let index = 0; index < cities.length; index += 2) {
    citiesMapped.push([cities[index], cities[index + 1] || ''])
}

export default function Cities() {
    useGSAP(() => {
        const rows = gsap.utils.toArray<HTMLDivElement>('.city')

        rows.forEach(row => {
            ScrollTrigger.create({
                trigger: row,
                start: `top+=-100 center`,
                end: `top+=-50 center`,
                scrub: true,
                // markers: true,
                onUpdate: self => {
                    const proggress = self.progress
                    const maxGap = window.innerWidth < 900 ? 5 : 6
                    const minGap = window.innerWidth < 900 ? 0.25 : 0.5
                    const currentGap = minGap + (maxGap - minGap) * proggress
                    row.style.gap = `${currentGap}rem`
                },
            })
            ScrollTrigger.create({
                trigger: row,
                start: `top+=50 center`,
                end: `top+=150 center`,
                scrub: true,
                // markers: true,
                onUpdate: self => {
                    const proggress = self.progress
                    const maxGap = window.innerWidth < 900 ? 0.25 : 0.5
                    const minGap = window.innerWidth < 900 ? 5 : 6
                    const currentGap = minGap + (maxGap - minGap) * proggress
                    row.style.gap = `${currentGap}rem`
                },
            })
        })
    }, [])

    return (
        <div className="min-h-screen w-full pb-12">
            <h6 className="font-eczar text-4xl min-[769px]:text-7xl text-center">
                Kami Tersedia <br /> di <span className="text-red-600">Kota-Kota</span> besar
            </h6>

            <div className="container mx-auto mt-12 relative">
                <div className="w-full h-full absolute top-0 left-0 -z-50 opacity-40">
                    <MapIcon />
                </div>
                {citiesMapped.map(([city1, city2], index) => (
                    <div className="flex justify-center w-full city gap-x-2" key={'city-' + index}>
                        <div className="w-1/2">
                            <p className="text-lg min-[769px]:text-4xl text-right">{city1}</p>
                        </div>
                        <div className="w-1/2">
                            <p className="text-lg min-[769px]:text-4xl text-left">{city2}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
