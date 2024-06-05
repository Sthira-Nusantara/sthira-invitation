import { getUsersData } from '@/modules/users/get-users'
import { setUserLogin } from '@/modules/users/set-user-login'
import { InvitationUserData } from '@/modules/users/types/user'
import { NextApiRequest, NextApiResponse } from 'next'

export type LoginResponse = { data: null; error?: string } | { data: InvitationUserData }

export default async function handler(req: NextApiRequest, res: NextApiResponse<LoginResponse>) {
    const { username, password } = req.body

    if (!username || !password) {
        return res.json({ data: null, error: 'Data tidak ditemukan' })
    }

    const users = await getUsersData()
    const user = users[username]
    if (!user) {
        return res.json({ data: null, error: 'Data tidak ditemukan' })
    }

    if (user.password !== password) {
        return res.json({ data: null, error: 'Kata sandi tidak sesuai' })
    }

    await setUserLogin(users, username)

    return res.json({ data: user })
}
