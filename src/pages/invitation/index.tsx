import { useApp } from '@/context/app/useContext'
import { invitationMenus } from '@/modules/invitation/data/menus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

        const toggleSetMenu = (deltaY: number) => {
            setMenu(prevMenu => {
                let newMenu = prevMenu + (deltaY > 0 ? 1 : -1)

                if (newMenu < 0) {
                    newMenu = invitationMenus.length - 1
                }
                if (newMenu >= invitationMenus.length) {
                    newMenu = 0
                }
                console.log(prevMenu, newMenu)

                return newMenu
            })
        }

        wrapperRef.current.addEventListener('wheel', event => {
            toggleSetMenu(event.deltaY)
        })

        let startY: number
        let timeout: NodeJS.Timeout | null = null
        wrapperRef.current.addEventListener('touchstart', event => {
            startY = event.touches[0].clientY
        })

        wrapperRef.current.addEventListener('touchmove', event => {
            const endY = event.touches[0].clientY
            const deltaY = startY - endY
            if (Math.abs(deltaY) > 0) {
                if (timeout) {
                    return
                }

                timeout = setTimeout(() => {
                    toggleSetMenu(deltaY)
                    timeout = null
                }, 500)
            }
        })
    }, [])

    return (
        <>
            <Head>
                <title>Grand Opening Invitation</title>
            </Head>

            <div className="relative w-screen h-screen overflow-hidden" ref={wrapperRef}>
                <div className="fixed bottom-4 px-4 md:bottom-12 md:px-12 left-0 right-0 overflow-hidden overflow-x-auto">
                    <div className="w-fit h-fit rounded-lg bg-red-600 mx-auto flex p-3 gap-x-3">
                        {invitationMenus.map((item, index) => (
                            <div
                                className={[
                                    'p-4 flex items-center flex-col rounded-lg cursor-pointer min-w-24 text-sm',
                                    index === menu ? 'bg-white text-red-600' : 'bg-transparent',
                                ].join(' ')}
                                onClick={() => setMenu(index)}
                                key={'menu-inv-' + index}
                            >
                                <FontAwesomeIcon icon={item.icon} />
                                <p className="whitespace-nowrap">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
