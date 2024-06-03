import Development from '@/modules/404/components/development'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import OnProgressBar from '../on-progress'

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const tl = useMemo(() => gsap.timeline({ paused: true }), []) //timeline with useMemo

    useGSAP(() => {
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

    // const immediateClose = () => {
    //     tl.duration(1).reverse()
    //     setMenuOpen(false)
    // }

    // const maxMenuLinkHeight = (viewport.height - 200) / 6

    return (
        <header>
            <div className="absolute top-0 left-0 right-0 w-full">
                <OnProgressBar />
            </div>
            <div className="head-menu">
                <div className="flex justify-between items-center">
                    <div className="logo">
                        <Link href="/">
                            Sthira
                            <br />
                            Nusantara.
                        </Link>
                    </div>
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

            <div className="menu-link">
                <div className="w-full max-w-96 mx-auto">
                    <Development />
                </div>
            </div>
        </header>
    )
}

export default Menu
