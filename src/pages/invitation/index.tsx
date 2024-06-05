import { useApp } from '@/context/app/useContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Invitation() {
    const router = useRouter()
    const { user } = useApp()

    useEffect(() => {
        if (!user) {
            router.replace('/login')
        }
    }, [])

    return <div>Invitation</div>
}
