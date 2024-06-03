import { PanoViewer } from '@egjs/view360'

function toRadian(deg: number) {
    return (deg * Math.PI) / 180
}

function getHFov(fov: number, container: HTMLElement) {
    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    return (Math.atan((width / height) * Math.tan(toRadian(fov) / 2)) / Math.PI) * 360
}

function normalizeAngle(angle: number) {
    return ((angle + 180) % 360) - 180
}

export function setHotspotOffset(hotspot: HTMLElement, viewer: PanoViewer, container: HTMLElement) {
    const oyaw = viewer.getYaw()
    const opitch = viewer.getPitch()
    const yaw = hotspot.dataset.yaw ? parseFloat(hotspot.dataset.yaw) : 0
    const pitch = hotspot.dataset.pitch ? parseFloat(hotspot.dataset.pitch) : 0

    const deltaYaw = normalizeAngle(yaw - oyaw)
    const deltaPitch = pitch - opitch

    if (Math.abs(deltaYaw) > 90) {
        hotspot.style.transform = 'translate(-200px, 0px)'
        return
    }

    const radYaw = toRadian(deltaYaw)
    const radPitch = toRadian(deltaPitch)

    const fov = viewer.getFov()
    const hfov = getHFov(fov, container)

    const rx = Math.tan(toRadian(hfov) / 2)
    const ry = Math.tan(toRadian(fov) / 2)

    const point = [Math.tan(-radYaw) / rx, Math.tan(-radPitch) / ry]

    const left = (viewer as any)._width / 2 + (point[0] * (viewer as any)._width) / 2
    const top = (viewer as any)._height / 2 + (point[1] * (viewer as any)._height) / 2

    hotspot.style.transform = `translate(${left}px, ${top}px) translate(-50%, -50%)`
}
