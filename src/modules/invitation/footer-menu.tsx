import React from 'react'
import { invitationMenus } from './data/menus'
import { MenuBaseProps } from './types/menu-base-props'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FooterMenu({ menu, setMenu }: MenuBaseProps) {
    return (
        <div className="fixed bottom-4 px-4 md:bottom-12 md:px-12 left-0 right-0 overflow-hidden overflow-x-auto">
            <div className="w-fit h-fit rounded-lg bg-red-600 mx-auto flex p-3 gap-x-3">
                {invitationMenus.map((item, index) => (
                    <div
                        className={[
                            'p-4 flex items-center flex-col rounded-lg cursor-pointer text-sm hover:bg-slate-300 hover:text-red-800',
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
    )
}
