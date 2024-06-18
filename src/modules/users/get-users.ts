import { getBytes } from 'firebase/storage'
import { invitationDataRef } from './firebase'
import { InvitationUserData } from './types/user'

let data: Record<string, InvitationUserData>

export const getUsersData = async () => {
    if (data) {
        return data
    }

    const strData = await getBytes(invitationDataRef).then(buffer => Buffer.from(buffer).toString('utf-8'))
    data = JSON.parse(strData)

    return data
}

export const getUserData = async (username: string) => {
    const users = await getUsersData()

    const user = users[username]
    if (user) {
        return JSON.parse(JSON.stringify(user))
    }

    const newUsers = await refreshUsersData()
    return JSON.parse(JSON.stringify(newUsers[username] || null))
}

export const refreshUsersData = async () => {
    const strData = await getBytes(invitationDataRef).then(buffer => Buffer.from(buffer).toString('utf-8'))
    data = JSON.parse(strData)

    return data
}
