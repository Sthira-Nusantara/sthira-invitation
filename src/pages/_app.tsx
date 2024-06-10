import Menu from '@/components/menu/menu'
import AppProvider from '@/context/app/provider'
import '@/styles/globals.css'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import moment from 'moment'
import 'moment/locale/id'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Invitation from './invitation'
import Login from './login'

moment.locale('id')

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP)

const onlyComponentPages = [Login.name, Invitation.name]

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Sthira Nusantara</title>
                <meta name="description" content="Sthira Nusantara the reliable partner you can trust" />
                <meta
                    name="keywords"
                    content="Sthira Nusantara, Daikin Proshop, Pro-Shop, Daikin, AC, Air Conditioner"
                />
                <meta name="author" content="Sthira Nusantara" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                <meta name="og:title" content="Sthira Nusantara" />
                <meta name="og:description" content="Sthira Nusantara the reliable partner you can trust" />
                <meta name="og:image" content="/images/logo.png" />
                <meta name="og:url" content="https://www.sthira.id" />
                <meta name="og:site_name" content="Sthira Nusantara" />
                <meta name="og:type" content="website" />
                <meta name="og:locale" content="id_ID" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@sthira" />
                <meta name="twitter:creator" content="@sthira" />
                <meta name="twitter:title" content="Sthira Nusantara" />
                <meta name="twitter:description" content="Sthira Nusantara the reliable partner you can trust" />
                <meta name="twitter:image" content="/images/logo.png" />
                <meta name="twitter:url" content="https://www.sthira.id" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

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
        </>
    )
}
