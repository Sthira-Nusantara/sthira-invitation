import { InvitationUserData } from '@/modules/users/types/user'

export function getLoggedInUser(): InvitationUserData {
    const user = localStorage.getItem('logged-in-user')
    return user ? JSON.parse(user) : null
}

export function setLoggedInUser(user: InvitationUserData) {
    localStorage.setItem('logged-in-user', JSON.stringify(user))
}
