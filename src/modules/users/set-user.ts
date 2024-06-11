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

export const setUserVehicle = async (
    username: string,
    vehicle: 'driver' | 'non-driver' | 'motorcycle' | 'not-attend',
) => {
    const data = await getUsersData()
    const userData = data[username]

    if (!userData) {
        return
    }

    if (!Array.isArray(userData.vehicle)) {
        userData.vehicle = [vehicle]
    } else {
        userData.vehicle.push(vehicle)
    }

    await uploadString(invitationDataRef, JSON.stringify(data))
}
