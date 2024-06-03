export interface ZoneData {
    id: string
    name: string
    cities?: string[]
}

export const networkDataMapped: Record<string, ZoneData> = {
    banten: {
        id: 'banten',
        name: 'Banten',
        cities: ['Tangerang'],
    },
    jakarta: {
        id: 'jakarta',
        name: 'Jakarta',
        cities: ['Jakarta Pusat', 'Jakarta Barat', 'Jakarta Selatan', 'Jakarta Utara', 'Jakarta Timur'],
    },
    jawa_barat: {
        id: 'jawa_barat',
        name: 'Jawa Barat',
        cities: ['Bekasi', 'Depok', 'Bandung', 'Cirebon'],
    },
    jawa_tengah: {
        id: 'jawa_tengah',
        name: 'Jawa Tengah',
        cities: ['Semarang', 'Solo', 'Purwokerto', 'Pekalongan'],
    },
    jawa_timur: {
        id: 'jawa_timur',
        name: 'Jawa Timur',
        cities: ['Surabaya', 'Malang', 'Kediri', 'Malang', 'Jember'],
    },
    yogyakarta: {
        id: 'yogyakarta',
        name: 'Yogyakarta',
        cities: ['Yogyakarta'],
    },
    sumatra_utara: {
        id: 'sumatra_utara',
        name: 'Sumatra Utara',
        cities: ['Medan'],
    },
    sumatra_selatan: {
        id: 'sumatra_selatan',
        name: 'Sumatra Selatan',
        cities: ['Palembang'],
    },
    bengkulu: {
        id: 'bengkulu',
        name: 'Bengkulu',
    },
    riau: {
        id: 'riau',
        name: 'Riau',
        cities: ['Pekanbaru'],
    },
    kalimantan_barat: {
        id: 'kalimantan_barat',
        name: 'Kalimantan Barat',
        cities: ['Pontianak'],
    },
    kalimantan_selatan: {
        id: 'kalimantan_selatan',
        name: 'Kalimantan Selatan',
        cities: ['Banjarmasin'],
    },
    sulawesi_selatan: {
        id: 'sulawesi_selatan',
        name: 'Sulawesi Selatan',
        cities: ['Makassar'],
    },
    ntb: {
        id: 'ntb',
        name: 'NTB',
        cities: ['Lombok'],
    },
    bali: {
        id: 'bali',
        name: 'Bali',
        cities: ['Denpasar'],
    },
}

export const networkData = Object.values(networkDataMapped)
