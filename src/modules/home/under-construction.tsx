import Marquee from '@/components/marquee'

const underConstructions = Array.from({ length: 15 }, () => 'Website is under construction')

export default function UnderConstructions() {
    return (
        <div className="award-container">
            <Marquee className="award-marquee" paddingRight={12}>
                {underConstructions.map((text, index) => (
                    <div key={index} className="award-item">
                        <p className="award-item-text">{text}</p>
                        <p className="award-item-separator">•</p>
                    </div>
                ))}
            </Marquee>
            <div className="award-background" />
        </div>
    )
}
