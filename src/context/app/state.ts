/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InvitationData } from '@/modules/login/data/invitation-data'
import { createContext } from 'react'

interface AppContextProps {
    viewport: {
        width: number
        height: number
    }
    user?: InvitationData
    setUser: (user: InvitationData) => void
}

const defaultState: AppContextProps = {
    viewport: {
        width: 0,
        height: 0,
    },
    user: undefined,
    setUser: (user: InvitationData) => {},
}

export const AppContext = createContext<AppContextProps>(defaultState)
