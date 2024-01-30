// Setup dayjs
// eslint-disable-next-line no-restricted-imports
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import isoWeek from 'dayjs/plugin/isoWeek'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

export const TIMEZONE = 'Asia/Singapore'

import toLocalDateOnly from './plugins/toLocalDateOnly'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isoWeek)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)

dayjs.tz.setDefault(TIMEZONE)

// Custom plugins
dayjs.extend(toLocalDateOnly)

export { dayjs }
