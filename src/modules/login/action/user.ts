import { InvitationData } from '../data/invitation-data'

export function getLoggedInUser(): InvitationData {
    const user = localStorage.getItem('logged-in-user')
    return user ? JSON.parse(user) : null
}

export function setLoggedInUser(user: InvitationData) {
    localStorage.setItem('logged-in-user', JSON.stringify(user))
}
