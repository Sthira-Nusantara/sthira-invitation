import { CornerFloral } from '@/assets/icons'
import Envelope from '@/modules/login/envelope'
import Head from 'next/head'

export default function Login() {
    return (
        <>
            <Head>
                <title>Undangan Peresmian</title>
            </Head>

            <div className="w-screen h-screen overflow-hidden flex items-center justify-center px-2 relative">
                <Envelope />
                <div className="absolute top-0 left-0 w-24 h-24 opacity-30 bg-img">
                    <CornerFloral className="fill-white rotate-90" />
                </div>
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-30 bg-img">
                    <CornerFloral className="fill-white -rotate-90" />
                </div>
            </div>
        </>
    )
}
