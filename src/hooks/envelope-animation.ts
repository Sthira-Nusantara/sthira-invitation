import { config, useChain, useSpring, useSpringRef } from '@react-spring/web'

export function useEnvelopeLetterAnimation(isOpen: boolean) {
    const openAnimationRef = useSpringRef()
    const openAnimation = useSpring({
        ref: openAnimationRef,
        y: isOpen ? -50 : -30,
        config: config.stiff,
    })

    const scaleAnimationRef = useSpringRef()
    const scaleAnimation = useSpring({
        ref: scaleAnimationRef,
        width: isOpen ? '100%' : '90%',
        height: isOpen ? '100%' : '90%',
        config: config.stiff,
    })

    const zIndexAnimationRef = useSpringRef()
    const zIndexAnimation = useSpring({
        ref: zIndexAnimationRef,
        zIndex: isOpen ? 100 : 2,
    })

    const letterAnimation = useSpring({
        ref: scaleAnimationRef,
        opacity: isOpen ? 1 : 0,
        config: config.stiff,
    })

    const logoAnimationRef = useSpringRef()
    const logoAnimation = useSpring({
        ref: logoAnimationRef,
        opacity: isOpen ? 0 : 1,
        y: isOpen ? 50 : 0,
        config: config.stiff,
    })

    useChain(
        isOpen
            ? [logoAnimationRef, openAnimationRef, zIndexAnimationRef, scaleAnimationRef]
            : [scaleAnimationRef, zIndexAnimationRef, openAnimationRef, logoAnimationRef]
    )

    const wrapperAnimation = {
        ...openAnimation,
        ...scaleAnimation,
        ...zIndexAnimation,
    }

    return { wrapperAnimation, letterAnimation, logoAnimation }
}
