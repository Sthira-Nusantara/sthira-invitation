import { getInvitationData } from '@/utils/invitation-data'
import Invitation from './invitation'

export default async function Page({ params }: { params: Record<string, string> }) {
    const user = await getInvitationData(params.code)

    if (!user) return <div>No Item</div>

    return <Invitation user={user} />
}
