import { FirebaseOptions } from 'firebase/app'
import moment from 'moment'
import 'moment/locale/id'

moment.locale('id')

const OPENING_DATE = moment(process.env.NEXT_PUBLIC_OPENING_DATE || '', 'YYYY-MM-DD HH:mm')
const FIREBASE_CONFIG: FirebaseOptions = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}')

export { FIREBASE_CONFIG, OPENING_DATE }
