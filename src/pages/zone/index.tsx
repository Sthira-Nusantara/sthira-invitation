import BackText from '@/components/back-text/back-text'
import { ZoneData } from '@/modules/zone/data/network'
import IndonesiaMap from '@/modules/zone/map'
import ZoneMarquee from '@/modules/zone/marquee'
import { useState } from 'react'

export default function ZonesPage() {
    const [dataActive, setDataActive] = useState<ZoneData>()

    return (
        <>
            <BackText text="Wilayah" centerize>
                <div className="mx-auto px-2" style={{ maxWidth: 1500 }}>
                    <IndonesiaMap dataActive={dataActive} setDataActive={setDataActive} />
                </div>
            </BackText>

            <div className="py-10 px-2">
                <ZoneMarquee dataActive={dataActive} setDataActive={setDataActive} />
            </div>
        </>
    )
}
