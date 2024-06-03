import { SNLogoOnly } from '@/assets/icons'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Flip from 'gsap/dist/Flip'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useRef } from 'react'

export default function StickyBar() {
    const logoRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const footerScrollTrigger = footerAnimation()
        const logoScrollTrigger = logoAnimation()

        return () => {
            footerScrollTrigger?.kill()
            logoScrollTrigger?.kill()
        }
    }, [])

    const footerAnimation = () => {
        const footerLogo = document.getElementById('footer-logo')

        if (!logoRef?.current || !footerLogo) {
            return
        }
        const logo = logoRef.current
        const logoParent = logo.parentElement

        footerLogo.classList.add('opacity-0')

        return ScrollTrigger.create({
            trigger: 'footer',
            start: 'top-=120 center',
            end: 'top-=120 center',
            // markers: true,
            scrub: true,
            onLeave: () => {
                const stateLogoFooter = Flip.getState(footerLogo)
                gsap.set(logoParent, {
                    position: 'absolute',
                    y: `${window.scrollY}px`,
                })
                Flip.fit(logo, stateLogoFooter, { scale: true, duration: 1, opacity: 1 })
            },
            onEnterBack: () => {
                gsap.set(logoParent, { y: 0, position: 'fixed' })
                gsap.to(logo, { duration: 1, scale: 1, x: 0, y: 0, display: 'block' })
            },
        })
    }

    const logoAnimation = () => {
        const sticky = document.getElementById('sticky-ref')
        if (!sticky) {
            return
        }

        const duration = 0.2

        return ScrollTrigger.create({
            trigger: sticky,
            start: 'center center',
            end: 'center center',
            // markers: true,
            scrub: true,
            onEnter: () => {
                const state = Flip.getState(sticky)
                sticky.style.position = 'fixed'
                gsap.to(logoRef.current, { duration, width: '3rem' })
                Flip.from(state, { duration, ease: 'none' })
            },
            onEnterBack: () => {
                const state = Flip.getState(sticky)
                sticky.style.position = 'relative'
                gsap.to(logoRef.current, { duration, width: '6rem' })
                Flip.from(state, { duration, ease: 'none' })
            },
        })
    }

    return (
        <div className="w-full min-h-24 my-12">
            <div className="w-full top-1/2 left-0 right-0 mix-blend-difference flex px-4 items-center" id="sticky-ref">
                <div className="mx-auto w-24" ref={logoRef}>
                    <SNLogoOnly />
                </div>
            </div>
        </div>
    )
}
