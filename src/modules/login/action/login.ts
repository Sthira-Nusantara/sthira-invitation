import { getUserData } from '@/modules/users/get-users'
import { errNotFoundMsg, errPasswordMsg } from '@/pages/api/login'

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

export async function login(dto: LoginDto) {
    try {
        const username = (dto.uxsr || '').trim().toUpperCase()
        const password = (dto.pxwd || '').trim()

        if (!username || !password) {
            throw new Error(errNotFoundMsg)
        }

        const user = await getUserData(username)
        if (!user) {
            throw new Error(errNotFoundMsg)
        }

        if (user.password !== password) {
            throw new Error(errPasswordMsg)
        }

        return user
    } catch (error) {
        throw new Error((error as any)?.message || 'Terjadi kesalahan')
    }
}
