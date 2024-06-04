import { useApp } from '@/context/app/useContext'
import { login } from '@/modules/login/action/login'
import EnvelopeClose from '@/modules/login/envelope-close'
import EnvelopeOpen from '@/modules/login/envelope-open'
import EnvelopeShow from '@/modules/login/envelope-show'

export default function Login() {
    const { setUser } = useApp()

    const _onClickLogin = () => {
        try {
            const user = login({
                username: 'bca',
                password: '12345678',
            })
            setUser(user)
            alert(`Login berhasil, selamat datang ${user.name}`)
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }

    return (
        <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
            <EnvelopeClose />
            <EnvelopeShow />
            <EnvelopeOpen />
        </div>
    )
}
