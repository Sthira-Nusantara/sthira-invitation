import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { clientsData } from './data/clients'

export default function Clients() {
    const tableRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (tableRef.current) {
            const items = gsap.utils.toArray(tableRef.current?.querySelectorAll('table tr'))
            gsap.to(items, {
                opacity: 1,
                stagger: 0.2,
                immediateRender: true,
                borderBottom: i => {
                    return i === 0 ? '1px solid #ccc' : 'none'
                },
                scrollTrigger: {
                    trigger: tableRef.current,
                    start: '-175%',
                    end: '-50%',
                    scrub: true,
                    invalidateOnRefresh: true,
                    // markers: true,
                },
            })
        }
    }, [])

    return (
        <div className="container mx-auto mb-24" ref={tableRef}>
            <table className="w-1/2 mx-auto table-fixed">
                <thead>
                    <tr className="opacity-0">
                        <th className="w-1/3 py-2 text-left">Tahun</th>
                        <th className="py-2 text-left">Client</th>
                    </tr>
                </thead>
                <tbody>
                    {clientsData.map((client, index) => {
                        let year = client.fromYear

                        if (client.toYear) {
                            year =
                                client.toYear === 'NOW'
                                    ? `${client.fromYear} - Sekarang`
                                    : `${client.fromYear} - ${client.toYear}`
                        }

                        return (
                            <tr key={'col-' + index} className="opacity-0">
                                <td className="py-2">{year}</td>
                                <td className="py-2">{client.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
