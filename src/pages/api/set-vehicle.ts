import { SetVehicleDto } from '@/modules/invitation/action/set-vehicle'
import { setUserVehicle } from '@/modules/users/set-user'
import { NextApiRequest, NextApiResponse } from 'next'
import { errNotFoundMsg } from './login'

export type SetVehicleResponse = { data: null; error?: string } | { data: boolean }

export default async function handler(req: NextApiRequest, res: NextApiResponse<SetVehicleResponse>) {
    try {
        const { uxsr: username, vehicle } = req.body as SetVehicleDto

        if (!username || !vehicle) {
            return res.json({ data: null, error: errNotFoundMsg })
        }

        await setUserVehicle(username, vehicle as any)

        return res.json({ data: true })
    } catch (error) {
        return res.json({ data: null, error: 'Terjadi kesalahan' })
    }
}
