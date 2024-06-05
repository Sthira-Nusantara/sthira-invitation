import { LoginResponse } from '@/pages/api/login'
import { setLoggedInUser } from './user'

export interface LoginDto {
    username: string
    password: string
}

export async function login(dto: LoginDto) {
    dto.username = (dto.username || '').trim()
    dto.password = (dto.password || '').trim()

    const res: LoginResponse = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
    }).then(res => res.json())

    if (!res.data) {
        throw new Error(res.error || 'Terjadi kesalahan')
    }

    setLoggedInUser(res.data)

    return res.data
}
