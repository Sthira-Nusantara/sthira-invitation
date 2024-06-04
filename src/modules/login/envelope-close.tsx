import { CornerFloral, SNWhiteLogoOnly } from '@/assets/icons'

export default function EnvelopeClose() {
    return (
        <div className="w-full max-w-[400px] h-72 mx-auto relative" id="envelope">
            <div
                className="w-full h-full bg-red-600 rounded-b-lg flex justify-center items-end pb-7"
                id="envelope-body"
            >
                <div className="w-fit border-b border-solid border-b-white pb-1">
                    <p className="text-sm font-eczar font-bold">Sthira Nusantara</p>
                </div>
            </div>
            <div className="absolute w-full top-0 left-0 right-0 z-50 h-44" id="envelope-top-cover">
                <div className="relative w-full h-full flex justify-between items-end px-5 py-2">
                    <div
                        className="w-full h-full box-border absolute -z-10 top-0 left-0"
                        style={{
                            borderLeft: '13px solid transparent',
                            borderRight: '13px solid transparent',
                            borderTop: '11rem solid #850F13',
                        }}
                    />
                    <CornerFloral className="fill-white" />
                    <div className="w-11 h-11 mb-3">
                        <SNWhiteLogoOnly />
                    </div>
                    <CornerFloral className="-rotate-90 fill-white" />
                </div>
            </div>
        </div>
    )
}
