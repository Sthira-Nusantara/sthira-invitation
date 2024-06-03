import BackText from '@/components/back-text/back-text'
import { useApp } from '@/context/app/useContext'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Carousel from 'react-slick'
import { projectsCarouselData } from '../works/data/projects'

export default function Projects() {
    const { viewport } = useApp()
    const [index, setIndex] = useState(0)
    const [projectElements, setProjectElements] = useState<HTMLDivElement[]>([])

    useEffect(() => {
        setProjectElements(gsap.utils.toArray<HTMLDivElement>('.project-carousel'))
    }, [])

    useGSAP(() => {
        projectElements.forEach(element => {
            const activeElement = element.dataset.index === index.toString()

            if (activeElement) {
                return gsap.to(element, {
                    scale: 1.3,
                    duration: 1,
                })
            }

            gsap.to(element, {
                scale: 1,
                duration: 1,
            })
        })
    }, [index, projectElements])

    const getSlidesToShow = () => {
        if (viewport.width >= 1280) {
            return 3
        }
        if (viewport.width >= 768) {
            return 2
        }
        return 1
    }

    return (
        <BackText text="Projek" animation="up" className="pb-[250px]">
            <Carousel
                dots={false}
                infinite={true}
                speed={500}
                autoplay
                autoplaySpeed={2000}
                slidesToShow={getSlidesToShow()}
                centerMode
                slidesToScroll={1}
                arrows={true}
                beforeChange={(_, next) => {
                    setIndex(next)
                }}
            >
                {projectsCarouselData.map((project, index) => (
                    <div key={index + 'projects'} className="project-carousel w-full h-full" data-index={index}>
                        <div className="w-80 mx-auto overflow-hidden">
                            <Image
                                className="h-96 w-full rounded-2xl object-cover"
                                src={project.imageUri}
                                alt={project.title}
                                width={720}
                                height={900}
                            />
                            <p className="text-left font-bold font-eczar w-1/2">{project.title}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </BackText>
    )
}
