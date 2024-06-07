export const handleExitFullscreen = async (document: Document): Promise<void> => {
    try {
        const doc: any = document || {}
        screen.orientation.unlock()
        if (typeof doc.exitFullscreen === 'function') {
            return await doc.exitFullscreen()
        } else if (typeof doc.mozCancelFullScreen === 'function') {
            /* Firefox */
            return await doc.mozCancelFullScreen()
        } else if (typeof doc.webkitExitFullscreen === 'function') {
            /* Chrome, Safari and Opera */
            return await doc.webkitExitFullscreen()
        } else if (typeof doc.msExitFullscreen === 'function') {
            /* IE/Edge */
            return await doc.msExitFullscreen()
        }
    } catch (error) {
        // DO NOTHING
    }
}

export const handleFullScreen = async (document: HTMLElement): Promise<void> => {
    try {
        const doc: any = document || {}
        if (typeof doc.requestFullscreen === 'function') {
            return await doc.requestFullscreen()
        } else if (typeof doc.mozRequestFullScreen === 'function') {
            /* Firefox */
            return await doc.mozRequestFullScreen()
        } else if (typeof doc.webkitRequestFullscreen === 'function') {
            /* Chrome, Safari and Opera */
            return await doc.webkitRequestFullscreen()
        } else if (typeof doc.msRequestFullscreen === 'function') {
            /* IE/Edge */
            return await doc.msRequestFullscreen()
        }
    } catch (error) {
        // DO NOTHING
    }
}

export const rotateLandscape = async () => {
    const orientation: any = screen.orientation || {}
    if (typeof orientation?.lock === 'function') {
        await orientation.lock('landscape-primary').catch(() => 0) // 'landscape-primary' | 'landscape-secondary' | 'portrait-primary' | 'portrait-secondary'
    }
}

export const padStartNum = (num: number, total = 2): string => {
    return num.toString().padStart(total, '0')
}

export const monthsInIndonesia: Record<number, string> = {
    0: 'Januari',
    1: 'Februari',
    2: 'Maret',
    3: 'April',
    4: 'Mei',
    5: 'Juni',
    6: 'Juli',
    7: 'Agustus',
    8: 'September',
    9: 'Oktober',
    10: 'November',
    11: 'Desember',
}
