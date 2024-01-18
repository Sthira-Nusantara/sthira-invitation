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
