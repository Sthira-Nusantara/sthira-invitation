import { SNWhiteLogoOnly } from '@/assets/icons'
import { LoginDto } from '../action/login'
import styles from '../styles/envelope.module.css'

interface EnvelopeCardProps {
    login: (form: LoginDto, setForm: (form: LoginDto) => void) => void
    form: LoginDto
    setForm: (form: LoginDto) => void
}

export default function EnvelopeCard({ form, login, setForm }: EnvelopeCardProps) {
    const isDisabled = !form.uxsr || !form.pxwd

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
                        <label className="text-xs font-bold text-black whitespace-nowrap">Nama Pengguna</label>
                        <input
                            type="text"
                            name="uxsr"
                            className="text-xs flex-1 shadow-sm bg-transparent p-0 pr-2 text-black focus:outline-none uppercase"
                            placeholder="__________"
                            onChange={e => setForm({ ...form, uxsr: e.target.value })}
                            value={form.uxsr}
                        />
                    </div>
                    <div className="flex gap-1">
                        <label className="text-xs font-bold text-black whitespace-nowrap">Kata Sandi</label>
                        <input
                            type="text"
                            name="pxwd"
                            className="text-xs flex-1 shadow-sm bg-transparent p-0 pr-2 text-black focus:outline-none"
                            placeholder="______________"
                            onChange={e => setForm({ ...form, pxwd: e.target.value })}
                            value={form.pxwd}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <button
                    className="text-xs bg-red-600 px-3 py-1 rounded-lg disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-white hover:bg-red-900"
                    disabled={isDisabled}
                    onClick={() => !isDisabled && login(form, setForm)}
                >
                    Tampilkan Undangan
                </button>
            </div>
        </div>
    )
}
