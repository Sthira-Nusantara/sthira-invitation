import { socialMedias } from '@/modules/home/data/social-medias'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import MenuLink from './menu-link'
import { useApp } from '@/context/app/useContext'

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const { viewport } = useApp()

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

        tl.add('item-in', 0.5)

        tl.from(
            '.menu-link .primary-menu .menu-brand span',
            {
                y: 30,
                opacity: 0,
                duration: 0.3,
                ease: 'expo.inOut',
                stagger: 0.1,
            },
            'item-in',
        )

        tl.from(
            '.menu-link .primary-menu .social-item',
            {
                y: 30,
                opacity: 0,
                duration: 0.5,
                ease: 'expo.inOut',
                stagger: 0.1,
                reversed: true,
            },
            'item-in',
        )

        tl.fromTo(
            '.menu-link .secondary-menu .secondary-menu-link',
            {
                x: 3000,
            },
            {
                x: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'expo.inOut',
                reversed: true,
            },
            'item-in',
        )

        tl.fromTo(
            '.secondary-menu-link-child',
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 0.5,
                delay: 0.3,
                ease: 'expo.inOut',
            },
        )
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

    const immediateClose = () => {
        tl.duration(1).reverse()
        setMenuOpen(false)
    }

    const maxMenuLinkHeight = (viewport.height - 200) / 6

    return (
        <header>
            <div className="head-menu">
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

            <div className="menu-link">
                <div className="primary-menu">
                    <Link href="/" className={'menu-brand'} onClick={immediateClose}>
                        <span className={'block'}>Memberi</span>
                        <span className={'block'}>Kenyamanan</span>
                        <span className={'block'}>Baru.</span>
                    </Link>

                    <div className={'social-links'}>
                        {socialMedias.map((socialMedia, i) => (
                            <div className="social-item" key={i}>
                                <Link target="_blank" rel="noopener noreferer" href={socialMedia.link}>
                                    {socialMedia.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="secondary-menu">
                    <MenuLink index={5} onClick={immediateClose} maxHeight={maxMenuLinkHeight} />
                    <MenuLink index={4} onClick={immediateClose} maxHeight={maxMenuLinkHeight} />
                    <MenuLink index={3} onClick={immediateClose} maxHeight={maxMenuLinkHeight} />
                    <MenuLink index={2} onClick={immediateClose} maxHeight={maxMenuLinkHeight} />
                    <MenuLink index={1} onClick={immediateClose} maxHeight={maxMenuLinkHeight} />
                    <MenuLink index={0} onClick={immediateClose} maxHeight={maxMenuLinkHeight} />
                </div>
            </div>
        </header>
    )
}

export default Menu
