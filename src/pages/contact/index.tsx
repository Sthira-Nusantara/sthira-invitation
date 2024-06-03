import BackText from '@/components/back-text/back-text'
import styles from '@/modules/contact/styles/contact.module.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { socialMedias } from '@/modules/home/data/social-medias'
import Link from 'next/link'

const Contact = () => {
    useGSAP(() => {
        gsap.to(`.${styles.headWording}`, { x: 50, opacity: 1, duration: 1 })
        gsap.to(`.${styles.wording}`, { y: -50, opacity: 1, duration: 1, delay: 0.5 })
        gsap.to(`.${styles.preview}`, { x: 50, opacity: 1, duration: 1, delay: 0.5 })
        gsap.to(`.${styles.companyAddress}`, { y: -30, opacity: 1, duration: 1, delay: 0.5 })
        gsap.to(`.${styles.contactUs}`, { x: 50, opacity: 1, duration: 1, delay: 0.8 })
        gsap.to(`.${styles.followUs}`, { x: 50, opacity: 1, duration: 1, delay: 0.8 })
    }, [])

    return (
        <>
            <BackText text={'Hubungi Kami'}>
                <div className="w1024">
                    <div className="flex">
                        <div className={styles.description}>
                            <h2 className={styles.headWording}>
                                <span>Bekerja Sama</span> Dengan Kami
                            </h2>
                            <p className={styles.wording}>
                                Hai! Senang Anda ingin menghubungi kami. Baik sebagai calon klien atau sekadar ingin
                                tahu tentang kami, kami siap berkolaborasi untuk menciptakan ruangan dingin yang nyaman
                                untuk Anda.
                            </p>
                            <div className={styles.detail}>
                                <div className={styles.contactUs}>
                                    <h2>Hubungi Kami</h2>
                                    <p className="text-underline">cs@sthira-nusa.co.id</p>
                                    <p>(021) 6230 2345</p>
                                </div>
                                <div className={styles.followUs}>
                                    <h2>Ikuti Kami</h2>
                                    <div className="">
                                        {socialMedias.map((socialMedia, i) => (
                                            <p key={i}>
                                                <Link href={socialMedia.link}>{socialMedia.name}</Link>
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.image}>
                            <Image
                                width={1000}
                                height={1000}
                                src="/assets/img/SthiraPreview.png"
                                alt="Preview Sthira"
                                className={styles.preview}
                            />
                            <div className={styles.companyAddress}>
                                <h2 className="fw-700">PT. Sthira Nusantara</h2>
                                <p>
                                    Komplek Ruko 135 A5 - B1,
                                    <br />
                                    Jl. Pangeran Jayakarta RT.007 RW.007
                                    <br />
                                    Mangga Dua Selatan, Sawah Besar
                                    <br />
                                    Jakarta Pusat, DKI Jakarta, 10730
                                    <br />
                                    <span className="uppercase">Indonesia</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </BackText>
        </>
    )
}

export default Contact
