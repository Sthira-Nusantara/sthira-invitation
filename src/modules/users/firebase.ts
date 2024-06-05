import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig: FirebaseOptions = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}')

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

export const firebaseStorage = getStorage(firebaseApp)

export const invitationDataRef = ref(firebaseStorage, 'sthira.id/invitation_data.json')
