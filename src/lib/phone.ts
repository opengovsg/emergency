import { parsePhoneNumberFromString } from 'libphonenumber-js/max'

/**
 * Validates the phone number string using length information
 * @param phoneNumber
 * @returns true if validate, false otherwise
 */
export const isPhoneNumber = (phoneNumber: string): boolean => {
  const parsedNumber = parsePhoneNumberFromString(phoneNumber)

  if (!parsedNumber) {
    return false
  }

  return parsedNumber.isPossible()
}

/**
 * Validates the mobile phone number string
 * @param mobileNumber
 * @returns true if validate, false otherwise
 */
export const isMobilePhoneNumber = (mobileNumber: string): boolean => {
  const parsedNumber = parsePhoneNumberFromString(mobileNumber)

  if (!parsedNumber) return false

  if (startsWithSgPrefix(mobileNumber)) {
    return (
      isPhoneNumber(mobileNumber) &&
      // Regex checks if the national number starts with 8 or 9, and is of
      // length 8.
      !!parsedNumber.nationalNumber.match(/^[89][0-9]{7}$/g)
    )
  }

  // Not Singapore number, check type and early return if undefined.
  const parsedType = parsedNumber.getType()
  if (!parsedType) return false

  // All other countries uses number type to check for validity.
  return (
    isPhoneNumber(mobileNumber) &&
    // Have to include both MOBILE, FIXED_LINE_OR_MOBILE as some countries lump
    // the types together.
    ['FIXED_LINE_OR_MOBILE', 'MOBILE'].includes(parsedType)
  )
}

export const startsWithSgPrefix = (phoneNumber: string): boolean => {
  return phoneNumber.startsWith('+65')
}
