import Menu from '@/components/menu/menu'
import AppProvider from '@/context/app/provider'
import '@/styles/globals.css'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import type { AppProps } from 'next/app'

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP)

export default function App({ Component, pageProps }: AppProps) {
    if (Component.name.includes('Error')) {
        return (
            <AppProvider>
                <Menu />

                <Component {...pageProps} />
            </AppProvider>
        )
    }

    return (
        <AppProvider>
            <Menu />

            <main className="main">
                <Component {...pageProps} />
            </main>
        </AppProvider>
    )
}
