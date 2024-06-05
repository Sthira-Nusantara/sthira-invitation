import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faAddressBook, faClock, faHome } from '@fortawesome/free-solid-svg-icons'

export interface InvitationMenu {
    icon: IconProp
    text: string
}

export const invitationMenus: InvitationMenu[] = [
    {
        icon: faHome,
        text: 'Beranda',
    },
    {
        icon: faClock,
        text: 'Waktu',
    },
    {
        icon: faAddressBook,
        text: 'Alamat',
    },
]
