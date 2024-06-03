import VirtualTour from '@/modules/virtual-tour'
import { TourPoints, translatePoint } from '@/modules/virtual-tour/types/TourPoints'
import { GetServerSideProps } from 'next'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function VirtualTourPage({ point, pointName }: { point: TourPoints; pointName: string }) {
    const router = useRouter()

    if (!pointName) {
        return <ErrorPage statusCode={404} title="Point Not Found" />
    }

    if (point !== router.query.point) {
        pointName = translatePoint(router.query.point as any)
    }

    return (
        <>
            <Head>
                <title>Virtual Tour {pointName}</title>
            </Head>

            <div className="w-screen h-screen overflow-hidden">
                <VirtualTour
                    point={point}
                    hotspots
                    onPointChange={point => {
                        router.push(`/virtual-tour/${point}`, undefined, { shallow: true })
                    }}
                />
            </div>
        </>
    )
}

// make server side props the point & pointName
export const getServerSideProps: GetServerSideProps = async context => {
    const point = context.params?.point as string
    const pointName = point ? translatePoint(point as any) : null

    return {
        props: {
            point,
            pointName,
        },
    }
}
