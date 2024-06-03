import { PropsWithChildren } from 'react'
import styles from '../../styles/virtual-tour.module.css'

interface HotspotProps {
    xAxis: number
    yAxis: number
    onClick?: () => any
}

export default function Hotspot({ xAxis, yAxis, children, onClick }: PropsWithChildren<HotspotProps>) {
    return (
        <div
            className={`${styles.hotspot} ${onClick ? 'cursor-pointer' : ''}`}
            data-yaw={xAxis}
            data-pitch={yAxis}
            onClick={onClick}
        >
            {children || (
                <div className="animate-bounce cursor-pointer flex flex-col justify-center items-center">
                    <span className="relative flex h-10 w-10">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-10 w-10 bg-red-500"></span>
                    </span>
                </div>
            )}
        </div>
    )
}
