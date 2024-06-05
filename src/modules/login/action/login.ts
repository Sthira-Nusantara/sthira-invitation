import { LoginResponse } from '@/pages/api/login'
import { setLoggedInUser } from './user'

export interface LoginDto {
    uxsr: string
    pxwd: string
}

export async function login(dto: LoginDto) {
    dto.uxsr = (dto.uxsr || '').trim().toUpperCase()
    dto.pxwd = (dto.pxwd || '').trim()

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
