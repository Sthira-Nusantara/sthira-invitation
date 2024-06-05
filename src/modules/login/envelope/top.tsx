import { CornerFloral, SNWhiteLogoOnly } from '@/assets/icons'
import styles from '../styles/envelope.module.css'

interface EnvelopeTopProps {
    error?: string
}

export default function EnvelopeTop({ error }: EnvelopeTopProps) {
    return (
        <div className="relative w-full">
            <div className={`${styles.envelopeTop} ${styles.close}`} id="envelope-top">
                <div className={styles.wrapper}>
                    <div className={styles.trapezium} />
                    <CornerFloral className={`${styles.floral} ${styles.left}`} />
                    <div className={styles.envelopeLogo}>
                        <SNWhiteLogoOnly />
                    </div>
                    {error && (
                        <div className={styles.error}>
                            <p className="text-red-500 text-xs font-bold">{error}</p>
                        </div>
                    )}
                    <CornerFloral className={`${styles.floral} ${styles.right}`} />
                </div>
            </div>
        </div>
    )
}
