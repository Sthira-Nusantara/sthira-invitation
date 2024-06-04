import { CornerFloral } from '@/assets/icons'

export default function EnvelopeOpen() {
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
            <div className="w-full h-72">
                <div className="relative w-full h-12" style={{ background: '#D9D9D9' }}>
                    <div
                        className="w-full h-full box-border absolute z-10 top-0 left-0"
                        style={{
                            borderLeft: '13px solid transparent',
                            borderRight: '13px solid transparent',
                            borderTop: '3rem solid #EFEFEF',
                            boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 1)',
                        }}
                    />
                </div>
                <div
                    className="w-full h-60 bg-red-600 rounded-b-lg flex justify-center items-end pb-7"
                    id="envelope-body"
                >
                    <div className="w-fit border-b border-solid border-b-white pb-1">
                        <p className="text-sm font-eczar font-bold">Sthira Nusantara</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
