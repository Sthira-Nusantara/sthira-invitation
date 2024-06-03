import Awards from '@/modules/home/awards'
import Cities from '@/modules/home/cities'
import ContactUs from '@/modules/home/contact-us'
import Hero from '@/modules/home/hero'
import Projects from '@/modules/home/projects'
import Services from '@/modules/home/services'
import StickyBar from '@/modules/home/sticky-bar'
import VirtualTour from '@/modules/home/virtual-tour'

export default function Home() {
    return (
        <>
            <Hero />
            <Awards />
            <VirtualTour />
            <Services />
            <ContactUs />

            <div className="mt-[150px]">
                <Projects />
            </div>
            <StickyBar />
            <Cities />
        </>
    )
}
