export interface InvitationUserData {
    name: string
    username: string
    password: string
    notes?: string
    lastLoggedIn?: Date
    type: 'general' | 'personal'
    data?: Record<
        string,
        {
            vehicle: 'driver' | 'non-driver' | 'motorcycle' | 'not-attend'
            name?: string
        }
    >
}

export interface UserData extends InvitationUserData {
    id: string
}
