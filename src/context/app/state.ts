/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserData } from '@/modules/users/types/user'
import { createContext } from 'react'

interface AppContextProps {
    viewport: {
        width: number
        height: number
    }
    user?: UserData
    setUser: (user: UserData) => void
}

const defaultState: AppContextProps = {
    viewport: {
        width: 0,
        height: 0,
    },
    user: undefined,
    setUser: (user: UserData) => {},
}

export const AppContext = createContext<AppContextProps>(defaultState)
