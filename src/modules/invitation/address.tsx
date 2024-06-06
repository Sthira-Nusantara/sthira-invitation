import { useGSAP } from '@gsap/react'
import { MenuBaseProps } from './types/menu-base-props'
import gsap from 'gsap'
import styles from './styles/time.module.css'
import Link from 'next/link'

export default function InvitationAddress({}: MenuBaseProps) {
    useGSAP(() => {
        gsap.from('#map', {
            duration: 1.5,
            height: '0',
            ease: 'power2.out',
            delay: 1.5,
        })
    }, [])

    return (
        <div className="w-full h-full overflow-hidden">
            <div id="map" className="rounded-b-xl w-full h-full overflow-hidden relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d330.9487697133131!2d106.83127797527271!3d-6.143716901380289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5f0446849bf%3A0x3f0461ea474813d2!2sPT.%20STHIRA%20NUSANTARA!5e0!3m2!1sid!2sid!4v1717662776143!5m2!1sid!2sid?signed_in=false&callback=initMap"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="border-none w-full h-full relative z-40"
                    aria-disabled
                />
                <div className="absolute w-full h-full z-50 top-0 left-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className={`${styles.glass}`}>
                        <div className={styles.glassBox} />
                        <p className="text-red-600 text-3xl">Buka Map</p>
                    </div>

                    <Link
                        className="opacity-0 inline-block w-full h-full absolute top-0 left-0"
                        href="https://maps.app.goo.gl/7a15nx2UiPg8RrKM6"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Buka Map
                    </Link>
                </div>
            </div>
        </div>
    )
}
