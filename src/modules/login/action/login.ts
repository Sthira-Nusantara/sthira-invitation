import { getUserData } from '@/modules/users/get-users'
import { UserData } from '@/modules/users/types/user'
import { errNotFoundMsg, errPasswordMsg } from '@/pages/api/login'
import { setLoggedInUser } from './user'

export interface LoginDto {
    uxsr: string
    pxwd: string
}

// export async function login(dto: LoginDto) {
//     dto.uxsr = (dto.uxsr || '').trim().toUpperCase()
//     dto.pxwd = (dto.pxwd || '').trim()

//     const res: LoginResponse = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dto),
//     }).then(res => res.json())

//     if (!res.data) {
//         throw new Error(res.error || 'Terjadi kesalahan')
//     }

//     setLoggedInUser(res.data)

//     return res.data
// }

const getUniqueID = () => {
    const localID = parseInt(localStorage.getItem('sthrusrid') || '')
    if (localID) {
        return localID
    }

    const newLocalID = Math.floor(Math.random() * 1000000)
    localStorage.setItem('sthrusrid', newLocalID.toString())

    return newLocalID
}

export async function login(dto: LoginDto): Promise<UserData> {
    try {
        const username = (dto.uxsr || '').trim().toUpperCase()
        const password = (dto.pxwd || '').trim().toUpperCase()

        if (!username || !password) {
            throw new Error(errNotFoundMsg)
        }

        const userInvitation = await getUserData(username)
        if (!userInvitation) {
            throw new Error(errNotFoundMsg)
        }

        const id = `${username}/${getUniqueID()}`
        const data: UserData['data'] = {}

        if (userInvitation?.data?.[id]) {
            data[id] = userInvitation?.data?.[id]
        }

        const user: UserData = {
            ...userInvitation,
            data,
            id,
        }

        if (user.password !== password.toUpperCase()) {
            throw new Error(errPasswordMsg)
        }

        setLoggedInUser(user)

        return user
    } catch (error) {
        throw new Error((error as any)?.message || 'Terjadi kesalahan')
    }
}
