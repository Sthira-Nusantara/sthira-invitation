import { setUserData } from '@/modules/users/set-user'
import { errNotFoundMsg } from '@/pages/api/login'

export interface SetVehicleDto {
    uxsr: string
    vehicle: string
    name: string
}

// export async function setUserVehicle(dto: SetVehicleDto) {
//     dto.uxsr = (dto.uxsr || '').trim().toUpperCase()
//     dto.vehicle = (dto.vehicle || '').trim()

//     const res: SetVehicleResponse = await fetch('/api/set-vehicle', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dto),
//     }).then(res => res.json())

//     if (res.data === null) {
//         throw new Error(res.error || 'Terjadi kesalahan')
//     }

//     return res.data
// }

export async function setUserVehicle(dto: SetVehicleDto) {
    try {
        const username = (dto.uxsr || '').trim().toUpperCase()
        const vehicle = (dto.vehicle || '').trim()
        const name = (dto.name || '').trim()

        if (!username || !vehicle) {
            throw new Error(errNotFoundMsg)
        }

        await setUserData(username, vehicle as any, name)

        return true
    } catch (error) {
        throw new Error((error as any)?.message || 'Terjadi kesalahan')
    }
}
