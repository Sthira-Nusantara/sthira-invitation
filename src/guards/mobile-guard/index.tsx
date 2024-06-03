import useWindowSize from '@/hooks/useWindowSize'
import Error from 'next/error'
import { PropsWithChildren, useEffect, useState } from 'react'

export default function MobileGuard({ children }: PropsWithChildren) {
    const [widthWindow] = useWindowSize()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (!widthWindow) {
            return
        }

        setIsMobile(widthWindow <= 640)
    }, [widthWindow])

    if (isMobile) {
        return <Error statusCode={403} title="Website Under Maintenance" />
    }

    return <>{children}</>
}
