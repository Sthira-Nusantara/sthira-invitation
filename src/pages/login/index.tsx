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
            </div>
        </>
    )
}
