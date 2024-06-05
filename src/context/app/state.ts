/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InvitationUserData } from '@/modules/users/types/user'
import { createContext } from 'react'

interface AppContextProps {
    viewport: {
        width: number
        height: number
    }
    user?: InvitationUserData
    setUser: (user: InvitationUserData) => void
}

const defaultState: AppContextProps = {
    viewport: {
        width: 0,
        height: 0,
    },
    user: undefined,
    setUser: (user: InvitationUserData) => {},
}

export const AppContext = createContext<AppContextProps>(defaultState)
