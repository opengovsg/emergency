import { dayjs } from './dayjs'

export function calculateAge(dob: Date): { year: number; month: number }
export function calculateAge(dob: Date | null): {
  year?: number
  month?: number
}
export function calculateAge(dob: Date | null): {
  year?: number
  month?: number
} {
  if (!dob) return {}
  const today = new Date()
  const date = dayjs(dob).tz()
  const year = Math.abs(date.diff(today, 'year'))
  const month = Math.abs(date.diff(today, 'month')) - year * 12
  return { year, month }
}
