import invitations from '@/assets/invitations_data.json'

export interface InvitationData {
    name: string
    notes?: string
    id: string
}

export async function getInvitationData(id: string) {
    return (invitations as Record<string, InvitationData>)[id] || null
}
