import { useApp } from '@/context/app/useContext'
import { MenuBaseProps } from './types/menu-base-props'
import { SNLogoOnly } from '@/assets/icons'
import Link from 'next/link'

export default function InvitationHome({}: MenuBaseProps) {
    const { user } = useApp()

    return (
        <div className="w-full h-full overflow-hidden flex items-center justify-center">
            <div className="container mx-auto flex flex-col items-center">
                <div className="w-16 h-16 md:w-28 md:h-28">
                    <SNLogoOnly />
                </div>
                <p className="mt-3 text-center text-xs md:text-base">
                    Dear {user?.name}, we love to invite you to
                    <br />
                    the grand opening of our office.
                </p>
                <p className="mt-3 text-center text-2xl md:text-3xl font-bold text-red-600 font-eczar">
                    PT. Sthira Nusantara
                </p>
                <div className="my-6 w-full">
                    <div className="flex h-32 items-center justify-evenly w-full max-w-96 mx-auto">
                        <p className="font-eczar text-2xl">Jumat</p>
                        <div className="h-3/4 border-solid bg-red-600 w-1 rounded-xl" />
                        <p className="text-center font-eczar text-2xl">
                            05
                            <br />
                            2024
                        </p>
                        <div className="h-3/4 border-solid bg-red-600 w-1 rounded-xl" />
                        <p className="font-eczar text-2xl">Juli</p>
                    </div>
                    <p className="text-lg text-center">At 9.30 WIB s/d Selesai</p>
                </div>
                <div className="w-full">
                    <Link href="https://maps.app.goo.gl/7a15nx2UiPg8RrKM6" target="_blank" rel="noopener noreferrer">
                        <p className="text-center text-xl text-gray-400">Lokasi</p>
                        <p className="text-xs md:text-sm text-center text-white max-w-96 mx-auto">
                            Komp. Ruko, Jl. Pangeran Jayakarta No.135, RT.7/RW.7, Mangga Dua Sel., Kecamatan Sawah
                            Besar, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10730
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
