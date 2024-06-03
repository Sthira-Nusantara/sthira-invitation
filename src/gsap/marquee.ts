import gsap from 'gsap'

interface Config {
    reversed?: boolean
    repeat?: number
    paused?: boolean
    speed?: number
    snap?: number | boolean
    paddingRight?: string
    minWidth?: number
}

export class MarqueeTimeline extends gsap.core.Timeline {
    public times: number[]
    private length: number
    private startX: number
    private widths: number[]
    private xPercents: number[]
    private pixelsPerSecond: number
    private snap: (v: number) => number
    private curIndex = 0

    constructor(
        public items: HTMLElement[],
        private config: Config = {},
    ) {
        super({
            repeat: config.repeat,
            paused: config.paused,
            defaults: { ease: 'none' },
            onReverseComplete: () => {
                this.totalTime(this.rawTime() + this.duration() * 100)
            },
        })

        this.length = this.items.length
        this.startX = this.items[0].offsetLeft

        this.times = []
        this.widths = []
        this.xPercents = []

        this.pixelsPerSecond = (config.speed || 1) * 100
        this.snap = config.snap === false ? (v: number) => v : gsap.utils.snap(+(config.snap as any) || 1)

        this.init()
    }

    private init() {
        gsap.set(this.items, {
            xPercent: (i, el) => {
                const w = parseFloat(gsap.getProperty(el, 'width', 'px') as any)

                this.widths[i] = w
                this.xPercents[i] =
                    parseFloat(this.snap(parseFloat(gsap.getProperty(el, 'x', 'px') as any) / w) as any) * 100 +
                    parseFloat(gsap.getProperty(el, 'xPercent') as any)

                return this.xPercents[i]
            },
        })
        gsap.set(this.items, { x: 0 })

        const paddingRight = parseFloat(this.config.paddingRight as any) || 0
        let totalWidth =
            this.items[this.length - 1].offsetLeft +
            (this.xPercents[this.length - 1] / 100) * this.widths[this.length - 1] -
            this.startX +
            this.items[this.length - 1].offsetWidth *
                parseFloat(gsap.getProperty(this.items[this.length - 1], 'scaleX') as any) +
            paddingRight

        if (this.config.minWidth && this.config.minWidth > totalWidth) {
            totalWidth = this.config.minWidth
        }

        for (let i = 0; i < this.length; i++) {
            const item = this.items[i]
            const curX = (this.xPercents[i] / 100) * this.widths[i]
            const distanceToStart = item.offsetLeft + curX - this.startX
            const distanceToLoop =
                distanceToStart + this.widths[i] * parseFloat(gsap.getProperty(item, 'scaleX') as any)

            this.to(
                item,
                {
                    xPercent: this.snap(((curX - distanceToLoop) / this.widths[i]) * 100),
                    duration: distanceToLoop / this.pixelsPerSecond,
                },
                0,
            )
                .fromTo(
                    item,
                    { xPercent: this.snap(((curX - distanceToLoop + totalWidth) / this.widths[i]) * 100) },
                    {
                        xPercent: this.xPercents[i],
                        duration: (curX - distanceToLoop + totalWidth - curX) / this.pixelsPerSecond,
                        immediateRender: false,
                    },
                    distanceToLoop / this.pixelsPerSecond,
                )
                .add('label' + i, distanceToStart / this.pixelsPerSecond)

            this.times[i] = distanceToStart / this.pixelsPerSecond
        }

        this.progress(1, true).progress(0, true) // pre-render for performance
        if (this.config.reversed) {
            this.vars.onReverseComplete?.()
            this.reverse()
        }
    }

    public next(vars?: gsap.TweenVars): gsap.core.Tween {
        return this.toIndex(this.curIndex + 1, vars)
    }

    public previous(vars?: gsap.TweenVars): gsap.core.Tween {
        return this.toIndex(this.curIndex - 1, vars)
    }

    public current(): number {
        return this.curIndex
    }

    public toIndex(index: number, vars?: gsap.TweenVars): gsap.core.Tween {
        vars = vars || {}

        if (Math.abs(index - this.curIndex) > this.length / 2) {
            index += index > this.curIndex ? -this.length : this.length
        }

        const newIndex = gsap.utils.wrap(0, this.length, index)
        let time = this.times[newIndex]

        if (time > this.time() !== index > this.curIndex) {
            vars.modifiers = { time: gsap.utils.wrap(0, this.duration()) }
            time += this.duration() * (index > this.curIndex ? 1 : -1)
        }

        this.curIndex = newIndex
        vars.overwrite = true
        return this.tweenTo(time, vars)
    }

    public recalculate(): this {
        this.curIndex = 0
        this.kill()
        this.init() // re-init
        return this
    }

    public kill(): this {
        this.curIndex = 0
        this.progress(0, true).progress(1, true)
        return super.kill()
    }
}

export default function marqueeTimeline(items: HTMLElement[], config?: Config): MarqueeTimeline {
    return new MarqueeTimeline(items, config)
}
