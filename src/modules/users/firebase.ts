import { initializeApp } from 'firebase/app'
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyCLwwF3eZK2TnP6qDwNOy6DmgSRwnrToKI',
    authDomain: 'febrian-project.firebaseapp.com',
    projectId: 'febrian-project',
    storageBucket: 'febrian-project.appspot.com',
    messagingSenderId: '603668226994',
    appId: '1:603668226994:web:e537ebc7793c1147823aab',
    measurementId: 'G-B8WETYNXV0',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)

export const firebaseStorage = getStorage(firebaseApp)

export const invitationDataRef = ref(firebaseStorage, 'sthira.id/invitation_data.json')
