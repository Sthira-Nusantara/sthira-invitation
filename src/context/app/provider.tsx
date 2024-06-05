import useWindowSize from '@/hooks/useWindowSize'
import { getLoggedInUser } from '@/modules/login/action/user'
import { InvitationUserData } from '@/modules/users/types/user'
import { PropsWithChildren, useEffect, useState } from 'react'
import { AppContext } from './state'

export default function AppProvider({ children }: PropsWithChildren) {
    const [width, height] = useWindowSize()
    const [user, setUser] = useState<InvitationUserData>()

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
            {user !== undefined && children}
        </AppContext.Provider>
    )
}
