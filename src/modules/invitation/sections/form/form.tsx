import React, { useRef } from 'react'
import { TypeAttendance } from './types/attend'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import gsap from 'gsap'

export interface AttendanceFormProps {
    attendance?: TypeAttendance
    setAttendance: (attendance: TypeAttendance) => void
}

export default function AttendanceForm({ setAttendance }: AttendanceFormProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.set(wrapperRef.current, { scale: 0, opacity: 0 })

        ScrollTrigger.create({
            trigger: 'section#form',
            start: 'top top',
            end: 'top top',
            // markers: true,
            onEnter: () => {
                gsap.to(wrapperRef.current, { scale: 1, opacity: 1, duration: 2 })
            },
        })
    }, [])

    return (
        <div className="container mx-auto h-full flex items-center flex-col justify-center px-3" ref={wrapperRef}>
            <div className="w-full max-w-96 h-96 bg-red-600 rounded-tr-3xl rounded-bl-3xl flex flex-col">
                <div className="flex-1 flex justify-center items-center px-3">
                    <p className="text-2xl text-center">Apakah Anda berkesempatan hadir di acara kami?</p>
                </div>
                <div className="w-full flex justify-end items-end">
                    <button
                        className="text-lg px-4 py-1 rounded-tl-lg bg-gray-400 hover:bg-gray-500 text-white w-fit h-fit"
                        onClick={() => {
                            setAttendance('not-attend')
                        }}
                    >
                        Tidak Hadir
                    </button>
                    <button
                        className="text-2xl px-4 py-2 rounded-tl-lg bg-white text-red-600 w-fit h-fit font-bold hover:bg-gray-200"
                        onClick={() => {
                            setAttendance('attend')
                        }}
                    >
                        Hadir
                    </button>
                </div>
            </div>
        </div>
    )
}
