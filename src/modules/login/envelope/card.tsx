import { SNWhiteLogoOnly } from '@/assets/icons'
import { useApp } from '@/context/app/useContext'
import { useState } from 'react'
import { LoginDto, login } from '../action/login'
import styles from '../styles/envelope.module.css'

export default function EnvelopeCard() {
    const { setUser } = useApp()
    const [form, setForm] = useState<LoginDto>({
        username: '',
        password: '',
    })

    const isDisabled = !form.username || !form.password

    const onClickLogin = () => {
        try {
            if (isDisabled) {
                throw new Error('Data tidak ditemukan')
            }
            console.log(form.username)

            const user = login(form)
            setUser(user)
            alert(`Login berhasil, selamat datang ${user.name}`)
            setForm({
                username: '',
                password: '',
            })
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }

    return (
        <div
            className={styles.card}
            id="envelope-card"
            onClick={e => {
                e.stopPropagation()
            }}
        >
            <div className="w-full h-full flex flex-col justify-between pb-2 gap-y-1">
                <div className="flex justify-between w-full">
                    <div className="py-2 w-2/3">
                        <div>
                            <p className="font-bold text-black text-sm font-eczar">
                                Terimakasih telah membuka undangan ini
                            </p>
                            <p className="text-gray-500 text-xs">
                                Silahkan Masukan nama pengguna dan kata sandi yang telah diberikan
                            </p>
                        </div>
                    </div>
                    <div className="bg-red-600 p-3 pt-6 h-fit">
                        <div className="w-10 h-10">
                            <SNWhiteLogoOnly />
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex gap-1">
                        <label className="text-xs font-bold text-black">Nama Pengguna</label>
                        <input
                            type="text"
                            name="username"
                            className="text-xs flex-1 shadow-sm bg-transparent p-0 pr-2 text-black focus:outline-none uppercase"
                            placeholder="__________"
                            onChange={e => setForm({ ...form, username: e.target.value })}
                            value={form.username}
                        />
                    </div>
                    <div className="flex gap-1">
                        <label className="text-xs font-bold text-black">Kata Sandi</label>
                        <input
                            type="password"
                            name="password"
                            className="text-xs flex-1 shadow-sm bg-transparent p-0 pr-2 text-black focus:outline-none"
                            placeholder="______________"
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            value={form.password}
                        />
                    </div>
                </div>
                <button
                    className="text-xs bg-red-600 px-3 py-1 rounded-lg disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-white"
                    disabled={isDisabled}
                    onClick={() => onClickLogin()}
                >
                    Tampilkan Undangan
                </button>
            </div>
        </div>
    )
}
