import { FirebaseOptions } from 'firebase/app'
import moment from 'moment'
import 'moment/locale/id'

moment.locale('id')

const OPENING_DATE = moment(process.env.NEXT_PUBLIC_OPENING_DATE || '', 'YYYY-MM-DD HH:mm')
const FIREBASE_CONFIG: FirebaseOptions = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}')
const INVITATION_YOUTUBE_ID = process.env.NEXT_PUBLIC_INVITATION_YOUTUBE_ID || ''
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

export { FIREBASE_CONFIG, INVITATION_YOUTUBE_ID, MAPBOX_TOKEN, OPENING_DATE }
