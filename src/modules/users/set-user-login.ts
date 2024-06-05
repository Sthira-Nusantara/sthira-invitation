import { uploadString } from 'firebase/storage'
import { InvitationUserData } from './types/user'
import { invitationDataRef } from './firebase'

export const setUserLogin = async (data: Record<string, InvitationUserData>, username: string) => {
    const userData = data[username]
    if (!userData) {
        return
    }
    userData.lastLoggedIn = new Date()

    await uploadString(invitationDataRef, JSON.stringify(data))
}
