import { uploadString } from 'firebase/storage'
import { setLoggedInUser } from '../login/action/user'
import { invitationDataRef } from './firebase'
import { getUsersData } from './get-users'

export const setUserLogin = async (username: string) => {
    const data = await getUsersData()
    const userData = data[username]

    if (!userData) {
        return
    }
    userData.lastLoggedIn = new Date()

    await uploadString(invitationDataRef, JSON.stringify(data))
}

export const setUserData = async (
    id: string,
    vehicle: 'driver' | 'non-driver' | 'motorcycle' | 'not-attend',
    name?: string,
) => {
    const data = await getUsersData()
    const [username] = id?.split('/')
    const userData = data[username]

    if (!userData) {
        return
    }

    if (!userData.data) {
        userData.data = {}
    }

    name = name || userData.data?.[id]?.name
    userData.data[id] = {
        vehicle,
        name,
    }

    await uploadString(invitationDataRef, JSON.stringify(data))
    setLoggedInUser({
        ...userData,
        id,
        data: {
            [id]: {
                vehicle,
                name,
            },
        },
    })
}
