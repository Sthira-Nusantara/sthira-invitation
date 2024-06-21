import { getLoggedInUser } from '@/modules/login/action/user'
import { UserData } from '@/modules/users/types/user'
import { PropsWithChildren, useEffect, useState } from 'react'
import { AppContext } from './state'

export default function AppProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<UserData>()
    const [viewport, setViewport] = useState<[number, number]>([0, 0])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const user = getLoggedInUser()
        setUser(user)

        function updateSize() {
            setViewport([window.outerWidth, window.outerHeight])
        }
        updateSize() // Call initially to set initial width

        window.addEventListener('resize', updateSize)

        setIsLoaded(true)

        return () => {
            window.removeEventListener('resize', updateSize)
        }
    }, [])

    return (
        <AppContext.Provider
            value={{
                viewport: {
                    width: viewport[0],
                    height: viewport[1],
                },
                user,
                setUser,
            }}
        >
            {isLoaded && children}
        </AppContext.Provider>
    )
}
