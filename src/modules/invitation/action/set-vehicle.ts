import { setUserVehicle as setVehicle } from '@/modules/users/set-user'

export interface SetVehicleDto {
    uxsr: string
    vehicle: string
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

        if (!username || !vehicle) {
            throw new Error('Nama Pengguna tidak ditemukan')
        }

        await setVehicle(username, vehicle as any)

        console.log('SET TO')

        return true
    } catch (error) {
        console.log('SET TO ERROR', error)
        throw new Error((error as any)?.message || 'Terjadi kesalahan')
    }
}
