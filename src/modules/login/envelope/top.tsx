import { CornerFloral, SNWhiteLogoOnly } from '@/assets/icons'
import styles from '../styles/envelope.module.css'

export default function EnvelopeTop() {
    return (
        <div className="relative w-full">
            <div className={`${styles.envelopeTop} ${styles.close}`} id="envelope-top">
                <div className={styles.wrapper}>
                    <div className={styles.trapezium} />
                    <CornerFloral className={`${styles.floral} ${styles.left}`} />
                    <div className={styles.envelopeLogo}>
                        <SNWhiteLogoOnly />
                    </div>
                    <CornerFloral className={`${styles.floral} ${styles.right}`} />
                </div>
            </div>
        </div>
    )
}
