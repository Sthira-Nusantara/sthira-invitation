import { useApp } from '@/context/app/useContext'
import InvitationAddress from '@/modules/invitation/address'
import { invitationMenus } from '@/modules/invitation/data/menus'
import FooterMenu from '@/modules/invitation/footer-menu'
import InvitationHome from '@/modules/invitation/home'
import InvitationTime from '@/modules/invitation/time'
import { MenuBaseProps } from '@/modules/invitation/types/menu-base-props'
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

        let startY: number
        let timeout: NodeJS.Timeout | null = null

        const toggleSetMenu = (deltaY: number) => {
            if (timeout) {
                return
            }

            timeout = setTimeout(() => {
                setMenu(prevMenu => {
                    let newMenu = prevMenu + (deltaY > 0 ? 1 : -1)

                    if (newMenu < 0) {
                        newMenu = 0
                    }
                    if (newMenu >= invitationMenus.length) {
                        newMenu = invitationMenus.length - 1
                    }

                    return newMenu
                })
                timeout = null
            }, 300)
        }

        wrapperRef.current.addEventListener('wheel', event => {
            toggleSetMenu(event.deltaY)
        })

        wrapperRef.current.addEventListener('touchstart', event => {
            startY = event.touches[0].clientY
        })

        wrapperRef.current.addEventListener('touchmove', event => {
            const endY = event.touches[0].clientY
            const deltaY = startY - endY
            if (Math.abs(deltaY) > 0) {
                toggleSetMenu(deltaY)
            }
        })
    }, [])

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
                {render()}
                <FooterMenu {...baseProps} />
            </div>
        </>
    )
}
