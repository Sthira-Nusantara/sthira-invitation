import { ZoneData } from '../data/network'

export interface ZoneBaseProps {
    dataActive: ZoneData | undefined
    setDataActive: (data: ZoneData | undefined) => void
}
