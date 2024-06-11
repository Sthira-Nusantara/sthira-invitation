import { getUserData } from '@/modules/users/get-users'

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
            throw new Error('Nama Pengguna tidak ditemukan')
        }

        const user = await getUserData(username)
        if (!user) {
            throw new Error('Nama Pengguna tidak ditemukan')
        }

        if (user.password !== password) {
            throw new Error('Kata sandi tidak sesuai')
        }

        return user
    } catch (error) {
        throw new Error('Terjadi kesalahan')
    }
}
