import Menu from '@/components/menu/menu'
import AppProvider from '@/context/app/provider'
import '@/styles/globals.css'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import type { AppProps } from 'next/app'
import Login from './login'
import Invitation from './invitation'
import moment from 'moment'
import 'moment/locale/id'

moment.locale('id')

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP)

const onlyComponentPages = [Login.name, Invitation.name]

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AppProvider>
            {onlyComponentPages.includes(Component.name) ? (
                <Component {...pageProps} />
            ) : (
                <>
                    <Menu />
                    <main className={Component.name.includes('Error') ? '' : 'main'}>
                        <Component {...pageProps} />
                    </main>
                </>
            )}
        </AppProvider>
    )
}
