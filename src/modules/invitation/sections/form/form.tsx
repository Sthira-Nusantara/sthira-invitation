import { useApp } from '@/context/app/useContext'
import { downloadFile } from '@/utils/helpers'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import moment from 'moment'
import Image from 'next/image'
import { PropsWithChildren, useState } from 'react'
import { setUserVehicle } from '../../action/set-vehicle'
import { MarkerType } from './markers'

export interface AttendanceFormProps {
    vehicle?: MarkerType
    setVehicle: (vehicle: MarkerType) => void
}

function Button({
    isActive,
    children,
    onClick,
    className,
}: PropsWithChildren<{ isActive: boolean; onClick: () => void; className?: string }>) {
    return (
        <button
            className={`w-1/2 px-3 py-1 ${isActive ? 'bg-red-600' : 'bg-gray-400 hover:bg-gray-500'} text-white rounded-full mx-auto ${className || ''}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default function AttendanceForm({ setVehicle }: AttendanceFormProps) {
    const { user } = useApp()

    const [vehicleType, setVehicleType] = useState<MarkerType | 'car'>()
    const [name, setName] = useState('')

    const [formElements, setFormElements] = useState<HTMLDivElement[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const formIn = (el: HTMLElement | null) => {
        gsap.to(el, { y: 0, opacity: 1, display: 'flex', duration: 1 })
    }

    const formOut = (el: HTMLElement | null) => {
        gsap.set(el, { position: 'absolute' })
        gsap.to(el, {
            y: -1000,
            opacity: 0,
            display: 'none',
            duration: 1,
            onComplete: () => {
                el?.remove()
            },
        })
    }

    useGSAP(() => {
        const elements = gsap.utils.toArray<HTMLDivElement>('.attendance-form')

        setFormElements(elements)

        gsap.set(elements, { y: 1000, opacity: 0, display: 'none' })

        ScrollTrigger.create({
            trigger: 'section#form',
            start: 'top-=50 top',
            end: 'top-=50 top',
            // markers: true,
            onEnter: () => {
                formIn(elements[0])
            },
        })
    }, [])

    const setVehicleAll = (type: 'not-attend' | 'without-vehicle') => {
        setVehicle('all')
        if (user) {
            setUserVehicle({ uxsr: user.id, vehicle: type, name }).catch(() => {
                console.error('ERROR When update user vehicle')
            })
        }
    }

    const attend = () => {
        formOut(formElements[0])
        formIn(formElements[1])
    }

    const bringVehicle = () => {
        formOut(formElements[1])
        formIn(formElements[2])
    }

    const sendName = () => {
        formOut(formElements[1])
        formIn(formElements[2])

        formElements.splice(1, 1)
    }

    const sendForm = async () => {
        if (!vehicleType || vehicleType === 'car') {
            return
        }

        setIsLoading(true)

        if (vehicleType !== 'motorcycle') {
            downloadFile(
                '/images/Stiker Parkir Grand Opening SN.jpg',
                `Stiker Parkir Grand Opening SN [${moment().format('SSS')}].jpg`,
            )
        }

        if (user) {
            setUserVehicle({ uxsr: user.id, vehicle: vehicleType, name }).catch(() => {
                console.error('ERROR When update user vehicle')
            })
        }

        setIsLoading(false)

        setVehicle(vehicleType)
    }

    const disable = !vehicleType || vehicleType === 'car'

    return (
        <div className="container mx-auto h-full flex items-center flex-col justify-center px-3">
            <div className="w-full max-w-96 h-96 bg-blue-300 rounded-tr-3xl rounded-bl-3xl flex flex-col attendance-form">
                <div className="flex-1 flex justify-center items-center px-3">
                    <p className="text-2xl text-center">Apakah Bapak/Ibu berkesempatan hadir di acara kami?</p>
                </div>
                <div className="w-full flex justify-end items-end">
                    <button
                        className="text-lg px-4 py-1 rounded-tl-lg bg-gray-400 hover:bg-gray-500 text-white w-fit h-fit"
                        onClick={() => setVehicleAll('not-attend')}
                    >
                        Tidak Hadir
                    </button>
                    <button
                        className="text-2xl px-4 py-2 rounded-tl-lg bg-white text-blue-300 w-fit h-fit font-bold hover:bg-gray-200"
                        onClick={attend}
                    >
                        Hadir
                    </button>
                </div>
            </div>
            {!user?.data?.[user.id]?.name && user?.type === 'general' && (
                <div className="w-full max-w-96 bg-blue-300 rounded-tr-3xl rounded-bl-3xl flex flex-col min-h-52 attendance-form">
                    <div className="flex-1 px-3 py-6 flex items-center justify-center flex-col">
                        <p className="text-lg px-3 mb-6 text-center">Mohon untuk mengisi nama Bapak/Ibu</p>
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="Nama Bapak/Ibu"
                                className="w-full px-3 py-1 mt-1 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-300 text-black"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-end items-end">
                        <button
                            className="text-2xl px-4 py-2 rounded-tl-lg bg-white text-blue-300 w-fit h-fit font-bold hover:bg-gray-200 disabled:bg-gray-600 disabled:text-white disabled:cursor-not-allowed flex items-center gap-x-1"
                            onClick={sendName}
                            disabled={!name}
                        >
                            {isLoading && (
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5 text-gray-200 animate-spin fill-blue-300"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                            )}
                            Kirim
                        </button>
                    </div>
                </div>
            )}
            <div className="w-full max-w-96 h-96 bg-blue-300 rounded-tr-3xl rounded-bl-3xl flex flex-col attendance-form">
                <div className="flex-1 flex justify-center items-center px-3">
                    <p className="text-2xl text-center">Apakah Bapak/Ibu akan membawa kendaraan pribadi?</p>
                </div>
                <div className="w-full flex justify-end items-end">
                    <button
                        className="text-lg px-4 py-1 rounded-tl-lg bg-gray-400 hover:bg-gray-500 text-white w-fit h-fit"
                        onClick={() => setVehicleAll('without-vehicle')}
                    >
                        Tidak
                    </button>
                    <button
                        className="text-2xl px-4 py-2 rounded-tl-lg bg-white text-blue-300 w-fit h-fit font-bold hover:bg-gray-200"
                        onClick={bringVehicle}
                    >
                        Iya
                    </button>
                </div>
            </div>
            <div className="w-full max-w-96 bg-blue-300 rounded-tr-3xl rounded-bl-3xl flex flex-col min-h-96 attendance-form">
                <p className="text-sm text-left px-3 pt-3">
                    Untuk menentukan lokasi parkir yang sesuai, mohon memilih jenis kendaraan yang akan digunakan
                </p>
                <div className="flex-1 px-3 py-6">
                    <div>
                        <label className="text-sm text-gray-300">Tipe Kendaraan</label>
                        <div className="w-full flex gap-x-2 mt-1">
                            <Button
                                isActive={vehicleType === 'motorcycle'}
                                onClick={() => setVehicleType('motorcycle')}
                            >
                                Motor
                            </Button>
                            <Button
                                isActive={!!vehicleType && vehicleType !== 'motorcycle'}
                                onClick={() => setVehicleType('car')}
                            >
                                Mobil
                            </Button>
                        </div>
                    </div>
                    {vehicleType && vehicleType !== 'motorcycle' && (
                        <>
                            <div className="my-3">
                                <label className="text-sm text-gray-300">Supir Pribadi</label>
                                <div className="w-full flex gap-x-2 mt-1">
                                    <Button
                                        isActive={vehicleType === 'driver'}
                                        onClick={() => setVehicleType('driver')}
                                    >
                                        Memakai Supir
                                    </Button>
                                    <Button
                                        isActive={vehicleType === 'non-driver'}
                                        onClick={() => setVehicleType('non-driver')}
                                    >
                                        Tanpa Supir
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-x-2 items-center justify-between">
                                <div className="flex items-center justify-center overflow-hidden w-16 h-16 rounded">
                                    <Image
                                        src={'/images/Stiker Parkir Grand Opening SN.jpg'}
                                        alt="Stiker Parkir Grand Opening SN"
                                        width={200}
                                        height={300}
                                    />
                                </div>
                                <p className="text-xs flex-1 text-gray-300 text-justify">
                                    Gambar ini merupakan stiker parkir yang akan diunduh secara otomatis setelah tombol{' '}
                                    {'"'}Kirim{'"'} ditekan. Bapak/Ibu diharapkan mencetak stiker tersebut dan
                                    meletakkannya di dasbor mobil.
                                </p>
                            </div>
                        </>
                    )}
                </div>
                <div className="w-full flex justify-end items-end">
                    <button
                        className="text-2xl px-4 py-2 rounded-tl-lg bg-white text-blue-300 w-fit h-fit font-bold hover:bg-gray-200 disabled:bg-gray-600 disabled:text-white disabled:cursor-not-allowed flex items-center gap-x-1"
                        onClick={sendForm}
                        disabled={disable}
                    >
                        {isLoading && (
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-200 animate-spin fill-blue-300"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        )}
                        Kirim
                    </button>
                </div>
            </div>
        </div>
    )
}
