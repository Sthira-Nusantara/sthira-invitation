import useWindowSize from '@/hooks/useWindowSize'
import { getLoggedInUser } from '@/modules/login/action/user'
import { PropsWithChildren, useEffect, useState } from 'react'
import { AppContext } from './state'
import { InvitationData } from '@/modules/login/data/invitation-data'

export default function AppProvider({ children }: PropsWithChildren) {
    const [width, height] = useWindowSize()
    const [user, setUser] = useState<InvitationData>()

    useEffect(() => {
        const user = getLoggedInUser()
        setUser(user)
    }, [])

    return (
        <AppContext.Provider
            value={{
                viewport: {
                    width,
                    height,
                },
                user,
                setUser,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
