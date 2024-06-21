import { FIREBASE_CONFIG } from '@/config/config'
import { initializeApp } from 'firebase/app'
import { getStorage, ref } from 'firebase/storage'

// Initialize Firebase
export const firebaseApp = initializeApp(FIREBASE_CONFIG)

export const firebaseStorage = getStorage(firebaseApp)

export const invitationDataRef = ref(firebaseStorage, 'sthira.id/invitations_data.json')
