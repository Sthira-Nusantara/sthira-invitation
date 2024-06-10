import { SNLogoOnly } from '@/assets/icons'
import { OPENING_DATE } from '@/config/config'
import { useApp } from '@/context/app/useContext'
import { faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { MenuBaseProps } from '../types/menu-base-props'

export default function InvitationHome({}: MenuBaseProps) {
    const { user } = useApp()

    return (
        <section
            className="w-screen min-h-screen overflow-hidden flex items-center justify-center invitation"
            id="home"
        >
            <div className="container mx-auto flex flex-col items-center px-3">
                <div className="w-16 h-16 md:w-24 md:h-24">
                    <SNLogoOnly />
                </div>
                <p className="mt-3 text-center text-xs md:text-sm">
                    Yang terhormat, <span className="font-bold">{user?.name}</span>
                    <br />
                    Kami dengan antusias mengundang Anda ke Peresmian kantor kami
                </p>
                <p className="mt-3 text-center text-2xl md:text-3xl font-bold text-red-600 font-eczar">
                    PT. STHIRA NUSANTARA
                </p>
                <div className="my-6 w-full">
                    <div className="flex h-32 items-center justify-center w-full max-w-96 mx-auto">
                        <p className="font-eczar text-2xl capitalize flex-1 text-center">
                            {OPENING_DATE.format('dddd')}
                        </p>
                        <div className="h-3/4 border-solid bg-red-600 w-1 rounded-xl mx-8" />
                        <p className="text-center font-eczar text-2xl flex-1">
                            {OPENING_DATE.format('DD')}
                            <br />
                            {OPENING_DATE.format('YYYY')}
                        </p>
                        <div className="h-3/4 border-solid bg-red-600 w-1 rounded-xl mx-8" />
                        <p className="font-eczar text-2xl capitalize flex-1 text-center">
                            {OPENING_DATE.format('MMMM')}
                        </p>
                    </div>
                    <div className="w-fit mx-auto my-2">
                        <FontAwesomeIcon icon={faClock} className="text-xl text-center" />
                    </div>
                    <p className="text-lg text-center">{OPENING_DATE.format('[Pukul] HH:mm [s/d] [Selesai]')}</p>
                </div>
                <div className="w-full">
                    <div className="w-fit mx-auto mb-2">
                        <FontAwesomeIcon icon={faLocationDot} className="text-xl text-center" />
                    </div>
                    <Link
                        href="https://maps.app.goo.gl/7a15nx2UiPg8RrKM6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs md:text-sm text-center text-white max-w-96 mx-auto block"
                    >
                        Komp. Ruko, Jl. Pangeran Jayakarta No.135, RT.7/RW.7, Mangga Dua Sel., Kecamatan Sawah Besar,
                        Kota Jakarta Pusat.
                    </Link>
                </div>
            </div>
        </section>
    )
}
