import { CornerFloral, SNWhiteLogoOnly } from '@/assets/icons'

export default function EnvelopeShow() {
    return (
        <div className="w-full max-w-[400px] mx-auto relative" id="envelope">
            <div className="relative w-full h-44 flex justify-between items-start px-5 py-2" id="envelope-top-cover">
                <div
                    className="w-full h-full box-border absolute -z-10 top-0 left-0"
                    style={{
                        borderLeft: '13px solid transparent',
                        borderRight: '13px solid transparent',
                        borderBottom: '11rem solid white',
                    }}
                />
                <CornerFloral className="rotate-90 fill-red-600" />
                <CornerFloral className="-rotate-180 fill-red-600" />
            </div>
            <div className="h-12 relative w-full">
                <div className="bottom-0 left-0 absolute w-full h-44 z-50 px-4" style={{ background: '#EFEFEF' }}>
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
                    <div className="space-y-1 mt-2">
                        <div className="flex gap-1">
                            <label className="text-xs font-bold text-black">Nama Pengguna</label>
                            <input
                                type="text"
                                name="username"
                                className="text-xs flex-1 shadow-sm bg-transparent px-2 text-black focus:outline-none"
                                placeholder="__________"
                            />
                        </div>
                        <div className="flex gap-1">
                            <label className="text-xs font-bold text-black">Kata Sandi</label>
                            <input
                                type="password"
                                name="password"
                                className="text-xs flex-1 shadow-sm bg-transparent px-2 text-black focus:outline-none"
                                placeholder="__________"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-60 bg-red-600 rounded-b-lg flex justify-center items-end pb-7" id="envelope-body">
                <div className="w-fit border-b border-solid border-b-white pb-1">
                    <p className="text-sm font-eczar font-bold">Sthira Nusantara</p>
                </div>
            </div>
        </div>
    )
}
