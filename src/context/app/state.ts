import { createContext } from 'react'

type AppContextProps = typeof defaultState

const defaultState = {
    viewport: {
        width: 0,
        height: 0,
    },
}

export const AppContext = createContext<AppContextProps>(defaultState)
