import Countdown, { CountdownRendererFn } from 'react-countdown'
import styles from './styles/content.module.scss'

const renderer: CountdownRendererFn = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <span className={styles.countdownComplete}>Countdown Complete!</span>
    } else {
        return (
            <div className={styles.countdownContainer}>
                {!!days && <div className={styles.countdownUpside}>{days} hari</div>}
                <div className={styles.countdownDownside}>
                    {!!hours && (
                        <div className={styles.countdownPartition}>
                            <span className={styles.countdownItem}>{hours}</span>
                            <span className={styles.countdownLabel}>jam</span>
                        </div>
                    )}
                    <div className={styles.countdownPartition}>
                        <span className={styles.countdownItem}>{minutes}</span>
                        <span className={styles.countdownLabel}>menit</span>
                    </div>
                    <div className={styles.countdownPartition}>
                        <span className={styles.countdownItem}>{seconds}</span>
                        <span className={styles.countdownLabel}>detik</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapsHref =
    'https://www.google.com/maps/place/PT.+STHIRA+NUSANTARA/@-6.143754,106.8314406,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f5f0446849bf:0x3f0461ea474813d2!8m2!3d-6.143754!4d106.8314406!16s%2Fg%2F1pzt98t3r?entry=ttu'

export default function Content() {
    const targetDate = new Date('2024-02-18T16:00:00')

    return (
        <div className={styles.wrapper}>
            <h1>Sthira Invitation</h1>
            <Countdown date={targetDate} renderer={renderer} />
            <div className={styles.info}>
                <h2>Grand Opening PT. Sthira Nusantara</h2>
                <p className={styles.date}>
                    {targetDate.getDate().toString().padStart(2, '0')} |{' '}
                    {targetDate.getMonth().toString().padStart(2, '0')} | {targetDate.getFullYear().toString()}
                </p>

                <a className={styles.address} href={mapsHref} target="_blank" rel="noopener noreferrer">
                    <p>
                        Komp. Ruko, Jl. Pangeran Jayakarta No.135, RT.7/RW.7, Mangga Dua Sel., Kecamatan Sawah Besar,
                        Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10730
                    </p>
                </a>

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2336.138172751219!2d106.82860731089801!3d-6.143209438721468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5f0446849bf%3A0x3f0461ea474813d2!2sPT.%20STHIRA%20NUSANTARA!5e0!3m2!1sid!2sid!4v1705563686018!5m2!1sid!2sid"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className={styles.map}
                />
            </div>
        </div>
    )
}
