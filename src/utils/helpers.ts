export const handleExitFullscreen = async (document: Document): Promise<void> => {
    try {
        const doc: any = document || {}
        if (typeof screen.orientation?.unlock === 'function') {
            screen.orientation.unlock()
        }

        if (typeof doc.exitFullscreen === 'function') {
            await doc.exitFullscreen()
        } else if (typeof doc.mozCancelFullScreen === 'function') {
            /* Firefox */
            await doc.mozCancelFullScreen()
        } else if (typeof doc.webkitExitFullscreen === 'function') {
            /* Chrome, Safari and Opera */
            await doc.webkitExitFullscreen()
        } else if (typeof doc.msExitFullscreen === 'function') {
            /* IE/Edge */
            await doc.msExitFullscreen()
        }
    } catch (error) {
        // DO NOTHING
    }
}

export const handleFullScreen = async (document: HTMLElement): Promise<void> => {
    try {
        const doc: any = document || {}

        if (typeof doc.requestFullscreen === 'function') {
            await doc.requestFullscreen()
        } else if (typeof doc.mozRequestFullScreen === 'function') {
            /* Firefox */
            await doc.mozRequestFullScreen()
        } else if (typeof doc.webkitRequestFullscreen === 'function') {
            /* Chrome, Safari and Opera */
            return await doc.webkitRequestFullscreen()
        } else if (typeof doc.msRequestFullscreen === 'function') {
            /* IE/Edge */
            await doc.msRequestFullscreen()
        }
    } catch (error) {
        // DO NOTHING
    }
}

export const rotateLandscape = async () => {
    try {
        const orientation: any = screen.orientation || {}
        if (typeof orientation?.lock === 'function') {
            await orientation.lock('landscape-primary') // 'landscape-primary' | 'landscape-secondary' | 'portrait-primary' | 'portrait-secondary'
        }
    } catch (error) {
        // DO Nothing
    }
}

export const parseCoordinate = (coordinate: string): [number, number] => {
    const [latitude, longitude] = coordinate.split(/,\s?/).map(parseFloat)
    return [latitude || 0, longitude || 0]
}
