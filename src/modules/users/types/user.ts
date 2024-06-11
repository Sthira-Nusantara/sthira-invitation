export interface InvitationUserData {
    name: string
    username: string
    password: string
    notes?: string
    lastLoggedIn?: Date
    vehicle?: ('driver' | 'non-driver' | 'motorcycle' | 'not-attend')[]
}
