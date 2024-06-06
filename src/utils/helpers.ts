export const handleExitFullscreen = async (document: Document): Promise<void> => {
    const doc = document as any
    if (doc.exitFullscreen) {
        return doc.exitFullscreen()
    } else if (doc.mozCancelFullScreen) {
        /* Firefox */
        return doc.mozCancelFullScreen()
    } else if (doc.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        return doc.webkitExitFullscreen()
    } else if (doc.msExitFullscreen) {
        /* IE/Edge */
        return doc.msExitFullscreen()
    }
}

export const handleFullScreen = async (element: HTMLElement): Promise<void> => {
    const el = element as any
    if (el.requestFullscreen) {
        return el.requestFullscreen()
    } else if (typeof el.mozRequestFullScreen === 'function') {
        /* Firefox */
        return el.mozRequestFullScreen()
    } else if (typeof el.webkitRequestFullscreen === 'function') {
        /* Chrome, Safari and Opera */
        return el.webkitRequestFullscreen()
    } else if (typeof el.msRequestFullscreen === 'function') {
        /* IE/Edge */
        return el.msRequestFullscreen()
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
