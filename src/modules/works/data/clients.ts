interface ClientData {
    name: string
    fromYear: string
    toYear?: 'NOW' | string
}

export const clientsData: ClientData[] = [
    {
        name: 'PT. Sumber Alfaria Trijaya (ALFAMART)',
        fromYear: '2014',
        toYear: 'NOW',
    },
    {
        name: 'PT. Inti Idola Anugrah (Indomarco Group)',
        fromYear: '2013',
    },
    {
        name: 'PT. Inti Cakrawala Citra (Indomarco Group)',
        fromYear: '2013',
    },
    {
        name: 'PT. Indomarco Prismatama (Toko Indomaret)',
        fromYear: '2011',
    },
    {
        name: 'PT. Bank CIMB Niaga',
        fromYear: '2010',
    },
    {
        name: 'PT. Gramedia Asri Media',
        fromYear: '2010',
    },
]
