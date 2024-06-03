export enum TourPoints {
    FLOOR_3 = 'floor-3',
    FLOOR_4 = 'floor-4',
}

export function translatePoint(point: TourPoints) {
    switch (point) {
        case TourPoints.FLOOR_3:
            return 'Lantai 3'
        case TourPoints.FLOOR_4:
            return 'Lantai 4'
        default:
            return ''
    }
}
