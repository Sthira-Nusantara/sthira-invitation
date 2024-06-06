export function initScrollTrigger(element: HTMLElement, onScroll: (direction: 'up' | 'down') => void) {
    let startY: number
    let timeout: NodeJS.Timeout | null = null

    const scroll = (deltaY: number) => {
        if (timeout) {
            return
        }

        timeout = setTimeout(() => {
            onScroll(deltaY > 0 ? 'down' : 'up')
            timeout = null
        }, 300)
    }

    const onWheel = (event: WheelEvent) => {
        scroll(event.deltaY)
    }
    element.addEventListener('wheel', onWheel)

    const onTouchStart = (event: TouchEvent) => {
        startY = event.touches[0].clientY
    }
    element.addEventListener('touchstart', onTouchStart)

    const onTouchMove = (event: TouchEvent) => {
        const endY = event.touches[0].clientY
        const deltaY = startY - endY
        if (Math.abs(deltaY) > 0) {
            scroll(deltaY)
        }
    }
    element.addEventListener('touchmove', onTouchMove)

    return () => {
        element?.removeEventListener('wheel', onWheel)
        element?.removeEventListener('touchstart', onTouchStart)
        element?.removeEventListener('touchmove', onTouchMove)
    }
}
