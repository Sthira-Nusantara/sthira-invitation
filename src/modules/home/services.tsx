import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Services = () => {
    useGSAP(() => {
        gsap.from('.explain-section-wording', {
            x: -25,
            opacity: 0,
            scrollTrigger: {
                trigger: '.virtual-tour',
                start: '80%',
                end: '+=30%',
                scrub: true,
                // markers: true,
            },
        })

        gsap.utils.toArray('.explainer').map(element => {
            return gsap.fromTo(
                element as any,
                {
                    opacity: 0,
                    x: -25,
                },
                {
                    opacity: 1,
                    x: 0,
                    scrollTrigger: {
                        trigger: element as any,
                        start: 'center 70%',
                        end: 'center 30%',
                        scrub: true,
                        // markers: true,
                    },
                },
            )
        })
    }, [])
    return (
        <div className="w1024 services">
            <div className="services-container">
                <div className="left-side explain-section-wording">
                    <span className={'small-text'}>Kami disini untuk</span>
                    <div className={'title'}>
                        Berkolaborasi demi <br /> <span>Kenyamanan</span>
                    </div>
                    <div className={'description'}>Kami memastikan setiap detail untuk kenyamanan AC Anda.</div>
                </div>
                <div className="services-list">
                    <div className={'small-text brand-text explainer'}>Apa yang kami sediakan?</div>
                    <div className="explainer-container">
                        <div className={'explainer'}>
                            <div className="number">1</div>
                            <div className="title">Pemasangan Baru</div>
                            <div className="description">
                                Melibatkan proses instalasi sistem pendingin udara yang baru untuk bangunan atau
                                ruangan.
                            </div>
                        </div>
                        <div className={'explainer'}>
                            <div className="number">2</div>
                            <div className="title">Peremajaan</div>
                            <div className="description">
                                Fokus pada peningkatan atau penggantian komponen dalam sistem AC yang sudah ada guna
                                meningkatkan efisiensi dan kinerja.
                            </div>
                        </div>
                        <div className={'explainer'}>
                            <div className="number">3</div>
                            <div className="title">Pemeliharaan</div>
                            <div className="description">
                                Menyelenggarakan rutinitas perawatan rutin untuk memastikan kinerja sistem AC yang
                                optimal.
                            </div>
                        </div>
                        <div className={'explainer'}>
                            <div className="number">4</div>
                            <div className="title">Perencanaan Pemasangan</div>
                            <div className="description">
                                Proses perencanaan yang komprehensif untuk mengidentifikasi kebutuhan sistem pendingin
                                udara sesuai dengan karakteristik ruangan atau bangunan.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
