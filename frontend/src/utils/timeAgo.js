import { formatDistanceToNowStrict } from 'date-fns'

export const timeAgo = (createdAt) => {
  if (!createdAt) return ''

  const date = new Date(createdAt)
  const diff = formatDistanceToNowStrict(date, { addSuffix: false })
  const [value, unit] = diff.split(' ')

  // Map full unit names to short versions
  const unitMap = {
    second: 's',
    seconds: 's',
    minute: 'm',
    minutes: 'm',
    hour: 'h',
    hours: 'h',
    day: 'd',
    days: 'd',
    month: 'mo',
    months: 'mo',
    year: 'y',
    years: 'y',
  }

  return `${value}${unitMap[unit]} ago`
}
