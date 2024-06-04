import invitationJsonData from './invitation_data.json'

export interface InvitationData {
    name: string
    username: string
    password: string
    notes?: string
}

export const invitationData: Record<string, InvitationData> = invitationJsonData
