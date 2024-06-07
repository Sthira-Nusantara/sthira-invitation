import { LoginDto } from '@/modules/login/action/login'
import { getUsersData } from '@/modules/users/get-users'
import { setUserLogin } from '@/modules/users/set-user-login'
import { InvitationUserData } from '@/modules/users/types/user'
import { NextApiRequest, NextApiResponse } from 'next'

export type LoginResponse = { data: null; error?: string } | { data: InvitationUserData }

export const errNotFoundMsg = 'Nama Pengguna tidak ditemukan'
export const errPasswordMsg = 'Kata sandi tidak sesuai'

export default async function handler(req: NextApiRequest, res: NextApiResponse<LoginResponse>) {
    const { uxsr: username, pxwd: password } = req.body as LoginDto

    if (!username || !password) {
        return res.json({ data: null, error: errNotFoundMsg })
    }

    const users = await getUsersData()
    const user = users[username]
    if (!user) {
        return res.json({ data: null, error: errNotFoundMsg })
    }

    if (user.password !== password) {
        return res.json({ data: null, error: errPasswordMsg })
    }

    await setUserLogin(users, username)

    return res.json({ data: user })
}
