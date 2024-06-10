import { uploadString } from 'firebase/storage'
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
