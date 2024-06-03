import { PropsWithChildren } from 'react'
import styles from '../../styles/virtual-tour.module.css'

export default function Hotspots({ children }: PropsWithChildren) {
    return <div className={styles.hotspots}>{children}</div>
}
