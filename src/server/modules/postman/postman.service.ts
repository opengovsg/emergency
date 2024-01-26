import { SEND_MESSAGE_ENDPOINT } from './postman.constants'

export const sendMessage = async (
  recipient_name: string,
  mobile: string,
  recipient_nric: string,
  sender_name: string,
  sender_nric: string,
) => {
  const reqBody = {
    recipient: mobile,
    language: 'english',
    values: {
      recipient_name,
      mobile,
      recipient_nric,
      sender_name,
      sender_nric,
    },
  }
  await fetch(SEND_MESSAGE_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(reqBody),
  })
}
