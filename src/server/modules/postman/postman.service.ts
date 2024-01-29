import wretch from 'wretch'
import { env } from '~/env.mjs'
import { SEND_MESSAGE_ENDPOINT } from './postman.constants'
export const sendMessage = async (
  mobile: string,
  recipient_name: string | null,
  recipient_nric: string,
  sender_name: string | null,
  sender_nric: string,
) => {
  const reqBody = {
    body: `Dear ${recipient_name ?? ''} ${recipient_nric}
    
    You have received an emergency note from ${sender_name ?? ''} ${sender_nric}.

    Please visit enotes.hack.gov.sg to retrieve the note.

    -

    This is an automated message from the Government of Singapore. Please do not reply.`,
    recipient: mobile,
    label: 'enotes',
  }
  await wretch(SEND_MESSAGE_ENDPOINT)
    .auth(`Bearer ${env.POSTMAN_API_KEY}`)
    .post(reqBody)
    .res()
}
