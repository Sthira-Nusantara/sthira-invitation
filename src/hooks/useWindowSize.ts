import { useEffect, useState } from 'react'

export default function useWindowSize() {
    const [size, setSize] = useState<[number, number]>([0, 0])

    useEffect(() => {
        function updateSize() {
            setSize([window.outerWidth, window.outerHeight])
        }
        updateSize() // Call initially to set initial width

        window.addEventListener('resize', updateSize)
        return () => {
            window.removeEventListener('resize', updateSize)
        }
    }, [])

    return size
}
