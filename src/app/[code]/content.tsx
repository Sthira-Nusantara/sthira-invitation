import logo from '@/assets/logo.png'
import { monthsInIndonesia, padStartNum } from '@/utils/helpers'
import { Allison } from 'next/font/google'
import Image from 'next/image'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styles from './styles/content.module.scss'

const mapsHref =
    'https://www.google.com/maps/place/PT.+STHIRA+NUSANTARA/@-6.143754,106.8314406,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f5f0446849bf:0x3f0461ea474813d2!8m2!3d-6.143754!4d106.8314406!16s%2Fg%2F1pzt98t3r?entry=ttu'

const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
        return <span className={styles.countdownComplete}>The Day!</span>
    } else {
        return (
            <div className={styles.countdown}>
                {days && (
                    <>
                        <p>
                            <span className={styles.value}>{padStartNum(days)}</span>
                            <span className={styles.label}>hari</span>
                        </p>
                        <div className={styles.spacer} />
                    </>
                )}
                <p>
                    <span className={styles.value}>{padStartNum(hours)}</span>
                    <span className={styles.label}>jam</span>
                </p>
                <div className={styles.spacer} />
                <p>
                    <span className={styles.value}>{padStartNum(minutes)}</span>
                    <span className={styles.label}>menit</span>
                </p>
                <div className={styles.spacer} />
                <p>
                    <span className={styles.value}>{padStartNum(seconds)}</span>
                    <span className={styles.label}>detik</span>
                </p>
            </div>
        )
    }
}

const allison = Allison({ subsets: ['latin'], weight: '400' })

export default function Content() {
    const targetDate = new Date('2024-04-19T10:00:00')

    const date = padStartNum(targetDate.getDate())
    const month = monthsInIndonesia[targetDate.getMonth()]
    const year = targetDate.getFullYear()
    const hour = padStartNum(targetDate.getHours())
    const minute = padStartNum(targetDate.getMinutes())

    return (
        <div className={styles.wrapper}>
            <Image src={logo} className={styles.logoBG} alt="logo" />
            <div className={styles.dateWrapper}>
                <p className={`${allison.className} ${styles.allison}`}>Tanggal</p>
                <Countdown renderer={renderer} date={targetDate} />
                <p className={styles.date}>
                    {date} {month} {year}, {hour}:{minute}
                </p>
            </div>
            <div className={styles.titleWrapper}>
                <p className={`${allison.className} ${styles.allison}`}>Acara</p>
                <h1>
                    Acara Pembukaan Kantor Pusat <br /> PT. Sthira Nusantara
                </h1>
                <Image src={logo} alt="logo" className={styles.logo} />
            </div>
            <div className={styles.quoteWrapper}>
                <p className={`${allison.className} ${styles.allison}`}>Kata Sambutan</p>
                <p className={styles.quote}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quas quo nisi explicabo ratione
                    dolorum suscipit nam mollitia, voluptatem alias, perspiciatis sint perferendis velit vel cum
                    tempora, incidunt optio hic!
                </p>
            </div>
            <div className={styles.locationWrapper}>
                <p className={`${allison.className} ${styles.allison}`}>Lokasi</p>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2336.138172751219!2d106.82860731089801!3d-6.143209438721468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5f0446849bf%3A0x3f0461ea474813d2!2sPT.%20STHIRA%20NUSANTARA!5e0!3m2!1sid!2sid!4v1705563686018!5m2!1sid!2sid"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className={styles.map}
                />
                <h3>Kantor pusat PT. Sthira Nusantara</h3>
                <p className={styles.detail}>
                    Komp. Ruko, Jl. Pangeran Jayakarta No.135, RT.7/RW.7, Mangga Dua Sel., Kecamatan Sawah Besar, Kota
                    Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10730
                </p>
            </div>
        </div>
    )
}
