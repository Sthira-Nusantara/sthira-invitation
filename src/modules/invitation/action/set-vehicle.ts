import { SetVehicleResponse } from '@/pages/api/set-vehicle'

export interface SetVehicleDto {
    uxsr: string
    vehicle: string
}

export async function setUserVehicle(dto: SetVehicleDto) {
    dto.uxsr = (dto.uxsr || '').trim().toUpperCase()
    dto.vehicle = (dto.vehicle || '').trim()

    const res: SetVehicleResponse = await fetch('/api/set-vehicle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
    }).then(res => res.json())

    if (res.data === null) {
        throw new Error(res.error || 'Terjadi kesalahan')
    }

    return res.data
}
