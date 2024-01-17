import { getInvitationData } from '@/utils/invitation-data'
import Invitation from './invitation'
import styles from './styles/page.module.css'

export default async function Page({ params }: { params: Record<string, string> }) {
    const user = await getInvitationData(params.code)

    if (!user) return <div>No Item</div>

    return (
        <main className={styles.main}>
            <Invitation user={user} />
        </main>
    )
}
