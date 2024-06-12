import { Vector1 } from '@/assets/icons'
import BackText from '@/components/back-text/back-text'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Flip from 'gsap/dist/Flip'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

export default function Hero() {
    useGSAP(() => {
        const duration = 2
        const callButton = document.getElementById('call-button')

        if (!callButton) {
            return
        }

        const togglePosition = () => {
            const state = Flip.getState(callButton, { props: 'borderRadius,padding' })

            callButton.classList.toggle('drop-fixed')

            const tl = gsap.timeline()
            tl.to(callButton, { color: 'transparent', duration: 0.2 })

            const children = gsap.utils.toArray<HTMLElement>(callButton.children)
            gsap.set(children, { display: 'block', opacity: 0 })
            if (callButton.classList.contains('drop-fixed')) {
                gsap.set(children[0], { opacity: 0, display: 'none' })
                tl.to(children[1], { opacity: 1, duration: 0.2, display: 'block' })
            } else {
                gsap.set(children[1], { opacity: 0, display: 'none' })
                tl.to(children[0], { opacity: 1, duration: 0.2, display: 'block' })
            }

            tl.fromTo(callButton, { color: 'transparent' }, { color: 'white', immediateRender: false }, duration) // Fade in

            Flip.from(state, {
                duration: duration,
                ease: 'elastic(0.4,0.2)',
                absolute: callButton.classList.contains('drop-fixed') ? undefined : true,
            })
        }

        const scrollTrigger = ScrollTrigger.create({
            trigger: '.divider',
            start: 'top top',
            onEnter: togglePosition,
            onLeaveBack: togglePosition,
        })

        gsap.set('.divider', { height: '+=0' })

        return () => {
            scrollTrigger.kill()
        }
    })

    return (
        <BackText text={'Sthira Nusantara'} centerize className="w1024">
            <div className="hero-tagline">
                <h2 className="tagline">
                    Memberi Kenyamanan Baru<span>.</span>
                </h2>
                <h3 className="wording">The reliable partner you can trust</h3>
                <Vector1 className="w-[212px] min-[769px]:w-[343px] mt-1.5 min-[769px]:mt-5" />
            </div>
            <div className="hero-description">
                <p className="description-main">
                    Sthira Nusantara menawarkan layanan yang komprehensif mulai dari perencanaan, tata letak,
                    pemasangan, hingga pemeliharaan.
                </p>
                <p className="description-secondary">
                    Kami memiliki keahlian khusus dalam memberikan pengalaman pendinginan yang melebihi standar
                    konvensional, menetapkan standar baru untuk kenyamanan, efisiensi, dan estetika dalam industri
                    pendinginan udara
                </p>
            </div>
        </BackText>
    )
}
