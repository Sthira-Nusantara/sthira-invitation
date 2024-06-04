import { useApp } from '@/context/app/useContext'
import { login } from '@/modules/login/action/login'

export default function Login() {
    const { setUser } = useApp()

    const onClickLogin = () => {
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
        <div className="container mx-auto">
            <button onClick={onClickLogin} className="px-6 py-3 bg-red-600 rounded">
                Login
            </button>
        </div>
    )
}
