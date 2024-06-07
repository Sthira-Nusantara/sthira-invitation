import { useState } from 'react'
import AttendanceForm from './form'
import ShowMaps from './show'
import { TypeAttendance } from './types/attend'

export default function InvitationForm() {
    const [attendance, setAttendance] = useState<TypeAttendance>()

    return (
        <section className="w-screen h-screen overflow-hidden invitation py-8" id="form">
            {attendance ? (
                <ShowMaps attendance={attendance} setAttendance={setAttendance} />
            ) : (
                <AttendanceForm attendance={attendance} setAttendance={setAttendance} />
            )}
        </section>
    )
}
