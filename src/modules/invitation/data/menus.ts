import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faClock, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'

export interface InvitationMenu {
    icon: IconProp
    text: string
}

export const invitationMenus: InvitationMenu[] = [
    {
        icon: faEnvelope,
        text: 'Undangan',
    },
    {
        icon: faClock,
        text: 'Waktu',
    },
    {
        icon: faLocationDot,
        text: 'Alamat',
    },
]
