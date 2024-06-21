import { UserData } from '@/modules/users/types/user'

export function getLoggedInUser(): UserData {
    const user = localStorage.getItem('logged-in-user')
    return user ? JSON.parse(user) : null
}

export function setLoggedInUser(user: UserData) {
    localStorage.setItem('logged-in-user', JSON.stringify(user))
}
