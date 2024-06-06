import { useApp } from '@/context/app/useContext'
import { initScrollTrigger } from '@/modules/invitation/action/init-page'
import InvitationAddress from '@/modules/invitation/address'
import { invitationMenus } from '@/modules/invitation/data/menus'
import FooterMenu from '@/modules/invitation/footer-menu'
import InvitationHome from '@/modules/invitation/home'
import LogoBackground from '@/modules/invitation/logo-bg'
import InvitationTime from '@/modules/invitation/time'
import { MenuBaseProps } from '@/modules/invitation/types/menu-base-props'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

export default function Invitation() {
    const router = useRouter()
    const { user } = useApp()

    const wrapperRef = useRef<HTMLDivElement>(null)

    const [menu, setMenu] = useState(0)

    useEffect(() => {
        if (!user) {
            router.replace('/login')
            return
        }

        if (!wrapperRef?.current) {
            return
        }

        const onScroll = (direction: 'up' | 'down') => {
            setMenu(prevMenu => {
                let newMenu = prevMenu + (direction === 'down' ? 1 : -1)

                if (newMenu < 0) {
                    newMenu = invitationMenus.length - 1
                }
                if (newMenu >= invitationMenus.length) {
                    newMenu = 0
                }

                return newMenu
            })
        }
        const removeScrollTrigger = initScrollTrigger(wrapperRef.current, onScroll)

        return () => {
            removeScrollTrigger()
        }
    }, [])

    useGSAP(() => {
        gsap.from('#invitation-footer', {
            opacity: 0,
            bottom: -100,
            delay: 1,
            duration: 1,
            ease: 'back.inOut',
        })
    }, [])

    useGSAP(() => {
        gsap.fromTo(
            '#invitation-menu',
            { opacity: 0, scale: 0 },
            { scale: 1, duration: 1, opacity: 1, ease: 'circ.inOut', immediateRender: true },
        )
    }, [menu])

    const baseProps: MenuBaseProps = {
        menu,
        setMenu,
    }

    const render = () => {
        switch (menu) {
            case 1:
                return <InvitationTime {...baseProps} />
            case 2:
                return <InvitationAddress {...baseProps} />
            default:
                return <InvitationHome {...baseProps} />
        }
    }

    return (
        <>
            <Head>
                <title>Grand Opening Invitation</title>
            </Head>

            <div className="relative w-screen h-screen overflow-hidden" ref={wrapperRef}>
                <div id="invitation-menu" className="w-full h-full pb-28 px-8 md:pb-36">
                    {render()}
                </div>
                <FooterMenu {...baseProps} />
                <LogoBackground {...baseProps} />
            </div>
        </>
    )
}
