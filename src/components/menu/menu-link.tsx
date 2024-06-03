import { useApp } from '@/context/app/useContext'
import { menuLinks } from '@/modules/home/data/menus'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface MenuLinkProps {
    index: number
    onClick: () => void
    maxHeight?: number
}

export default function MenuLink({ index, onClick, maxHeight }: MenuLinkProps) {
    const menuLink = menuLinks[index]

    const router = useRouter()
    const { viewport } = useApp()

    const isActive = router.pathname === menuLink?.link

    const widthMinus = (viewport.width <= 640 ? 12 : 15) * index
    return (
        <div
            className={['secondary-menu-link relative', menuLink ? 'cursor-pointer' : ''].join(' ')}
            onClick={menuLink && onClick}
            style={{
                width: `${100 - widthMinus}%`,
                maxHeight,
            }}
        >
            {menuLink && (
                <>
                    <p className="secondary-menu-link-child uppercase text-lg md:text-3xl font-bold">{menuLink.name}</p>
                    <div className={['secondary-menu-link-child checklist', isActive ? 'active' : ''].join(' ')} />
                    <Link
                        className="absolute w-full h-full top-0 left-0 right-0 bottom-0 opacity-0"
                        href={menuLink.link}
                    >
                        {menuLink.name}
                    </Link>
                </>
            )}
        </div>
    )
}
