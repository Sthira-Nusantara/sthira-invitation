import { invitationData } from '../data/invitation-data'
import { setLoggedInUser } from './user'

interface LoginDto {
    username: string
    password: string
}

export function login(dto: LoginDto) {
    dto.username = (dto.username || '').trim()
    dto.password = (dto.password || '').trim()

    const user = invitationData[dto.username]

    if (!user) {
        throw new Error('Data tidak ditemukan')
    }

    if (user.password !== dto.password) {
        throw new Error('Password tidak sesuai')
    }

    setLoggedInUser(user)

    return user
}
