import { useApp } from '@/context/app/useContext'
import Development from '@/modules/404/components/development'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'
import { useMemo, useState } from 'react'

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const { user } = useApp()

    const tl = useMemo(() => gsap.timeline({ paused: true }), []) //timeline with useMemo

    useGSAP(() => {
        tl.add(() => {
            gsap.utils.toArray<HTMLElement>('.link-invitation').forEach(el => {
                el.style.display = el.style.display === 'none' ? '' : 'none'
            })
        })

        tl.to(document.body, {
            overflow: 'hidden',
            duration: 0.1,
        })

        tl.to('.menu-link', {
            x: 0,
            duration: 0.3,
            ease: 'expo.inOut',
        })

        tl.to('#hamburger .top', {
            rotate: 45,
            duration: 0.3,
        })

        tl.to('#hamburger .bottom', {
            rotate: 135,
            top: '45%',
            duration: 0.3,
        })
    }, [])

    const toggleMenu = () => {
        tl.duration(tl.totalDuration())
        if (!menuOpen) {
            tl.play()
        } else {
            tl.duration(1).reverse()
        }
        setMenuOpen(!menuOpen)
    }

    return (
        <header>
            <div className="head-menu">
                <div className="flex justify-between items-center">
                    <div className="logo">
                        <Link href="/">
                            Sthira
                            <br />
                            Nusantara.
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <Link
                            href={user ? '/invitation' : '/login'}
                            className="hidden md:block text-lg link-invitation"
                        >
                            Grand Opening Invitation
                        </Link>
                        <div className="btn" id="toggle-btn" onClick={toggleMenu}>
                            <div className="btn-outline btn-outline-1"></div>
                            <div className="btn-outline btn-outline-2"></div>
                            <div id="hamburger">
                                <span className="top" />
                                <span className="bottom" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4">
                    <Link href={user ? '/invitation' : '/login'} className="block md:hidden text-base link-invitation">
                        Grand Opening Invitation
                    </Link>
                </div>
            </div>

            <div className="menu-link flex items-center justify-center">
                <div className="w-full">
                    <h2 className="text-3xl md:text-6xl text-red-600 text-center font-eczar font-bold">COMING SOON</h2>
                    <div className="w-full mx-auto" style={{ maxWidth: 600 }}>
                        <Development />
                    </div>
                    <p className="text-center text-base md:text-xl text-white">
                        Our website is under construction, Come to us later when it’s ready
                    </p>
                </div>
            </div>
        </header>
    )
}

export default Menu
