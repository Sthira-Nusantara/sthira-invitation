import Marquee from '@/components/marquee'
import { awards } from './data/awards'

export default function Awards() {
    return (
        <div className="award-container">
            <Marquee className="award-marquee" paddingRight={12}>
                {awards.map((award, index) => (
                    <div key={index} className="award-item">
                        <p className="award-item-text" data-award={award}>
                            {award}
                        </p>
                        <p className="award-item-separator">•</p>
                    </div>
                ))}
            </Marquee>
            <div className="award-background" />
        </div>
    )
}
