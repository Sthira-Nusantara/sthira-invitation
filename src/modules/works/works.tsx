import BackText from '@/components/back-text/back-text'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import { projectsData } from './data/projects'

export default function Works() {
    useGSAP(() => {
        const items = gsap.utils.toArray<HTMLDivElement>('.portofolio')
        const leftItems = items.filter((_, i) => i % 2 === 0)
        const rightItems = items.filter((_, i) => i % 2 !== 0)

        gsap.to(leftItems, { y: '-30px' })
        gsap.to(rightItems, { y: '30px' })
        const scrollTrigger = ScrollTrigger.create({
            trigger: leftItems[0].parentElement,
            start: `-150px`,
            end: `80%`,
            pin: false,
            // markers: true,
            onUpdate: self => {
                let yPercent = 300 * self.progress

                if (yPercent < 30) {
                    yPercent = 30 + self.progress
                }

                gsap.to(leftItems, {
                    y: `-${yPercent}px`,
                    duration: 1,
                    ease: 'power3.out',
                })
                gsap.to(rightItems, {
                    y: `${yPercent}px`,
                    duration: 1,
                    ease: 'power3.out',
                })
            },
        })
        return () => {
            scrollTrigger.kill()
        }
    }, [])

    return (
        <>
            <BackText text="Portofolio" className="flex flex-wrap gap-y-6">
                {projectsData.map((project, index) => (
                    <div
                        key={index + '-portofolio'}
                        className={`w-1/2 px-3 flex ${index % 2 ? 'justify-start' : 'justify-end'} portofolio`}
                    >
                        <div>
                            <Image
                                src={project.imageUri}
                                alt={project.title}
                                width={328}
                                height={328}
                                className="w-80 object-cover rounded-lg h-80 bg-cover"
                            />
                            <h3 className="text-white drop-shadow text-2xl font-normal w-3/4 font-eczar">
                                {project.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </BackText>
        </>
    )
}
