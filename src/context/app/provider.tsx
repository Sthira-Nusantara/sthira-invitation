import useWindowSize from '@/hooks/useWindowSize'
import { PropsWithChildren } from 'react'
import { AppContext } from './state'

export default function AppProvider({ children }: PropsWithChildren) {
    const [width, height] = useWindowSize()

    return (
        <AppContext.Provider
            value={{
                viewport: {
                    width,
                    height,
                },
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
