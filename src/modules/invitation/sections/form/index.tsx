import { useState } from 'react'
import AttendanceForm from './form'
import { MarkerType } from './markers'
import ShowMaps from './show'

export default function InvitationForm() {
    const [vehicle, setVehicle] = useState<MarkerType>()

    return (
        <section className="w-screen h-screen overflow-visible invitation" id="form">
            {vehicle ? <ShowMaps vehicle={vehicle} /> : <AttendanceForm vehicle={vehicle} setVehicle={setVehicle} />}
        </section>
    )
}
