import BackText from '@/components/back-text/back-text'
import styles from '@/modules/virtual-tour/styles/virtual-tour.module.css'
import { TourPoints, translatePoint } from '@/modules/virtual-tour/types/TourPoints'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function VirtualToursPage() {
    const points = Object.values(TourPoints)

    return (
        <>
            <Head>
                <title>Virtual Tour</title>
            </Head>

            <BackText text="Virtual Tour">
                <div className="pb-[250px]">
                    {points.map(point => {
                        const pointName = translatePoint(point)
                        return (
                            <div className="w-full h-64 rounded-md overflow-hidden flex-1 relative" key={point}>
                                <Image
                                    alt={point}
                                    src={`/assets/virtual-tour/${point}/0.jpg`}
                                    width={1800}
                                    height={600}
                                    className="w-full object-cover"
                                    priority
                                />
                                <Link href={`/virtual-tour/${point}`}>
                                    <span className={styles.pointBackdrop}>
                                        <div>{pointName}</div>
                                    </span>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </BackText>
        </>
    )
}
