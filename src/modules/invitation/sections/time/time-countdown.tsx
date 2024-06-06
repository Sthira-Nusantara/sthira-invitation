import { OPENING_DATE } from '@/config/config'
import { CountdownRenderProps } from 'react-countdown'
import { MenuBaseProps } from '../../types/menu-base-props'
import styles from '../../styles/time.module.css'

export interface TimeCountdownProps extends CountdownRenderProps, MenuBaseProps {}

export default function TimeCountdown({ completed, days, hours, minutes, seconds }: TimeCountdownProps) {
    const print2Digit = (num: number) => num.toString().padStart(2, '0')

    return (
        <>
            <div className={styles.glass}>
                <div className={styles.glassBox} />
                {completed ? (
                    <div className="w-full">
                        <p className="text-center text-3xl md:text-5xl font-eczar">We Are Opened</p>
                    </div>
                ) : (
                    <div>
                        <p className="font-eczar text-2xl md:text-5xl text-center">We Are Open In</p>
                        <div className="flex gap-x-3 items-center justify-center my-3 md:my-6">
                            {!!days && (
                                <p>
                                    <span className={styles.countNum}>{print2Digit(days)}</span>{' '}
                                    <span className={styles.countText}>Hari</span>
                                </p>
                            )}
                            <p>
                                <span className={styles.countNum}>{print2Digit(hours)}</span>{' '}
                                <span className={styles.countText}>Jam</span>
                            </p>
                            <p>
                                <span className={styles.countNum}>{print2Digit(minutes)}</span>{' '}
                                <span className={styles.countText}>Menit</span>
                            </p>
                            {!days && (
                                <p>
                                    <span className={styles.countNum}>{print2Digit(seconds)}</span>{' '}
                                    <span className={styles.countText}>Detik</span>
                                </p>
                            )}
                        </div>
                        <p className="text-center text-gray-400 text-base md:text-xl">
                            {OPENING_DATE.format('dddd[,] DD MMMM YYYY [pukul] HH:mm [WIB]')}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}
