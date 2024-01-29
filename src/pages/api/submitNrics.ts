import { TRPCError } from '@trpc/server'
import { getHTTPStatusCodeFromError } from '@trpc/server/http'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { createContext } from '~/server/context'
import { appRouter } from '~/server/modules/_app'
// Respond with our OpenAPI schema
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const ctx = await createContext({ req, res })
    const caller = appRouter.createCaller(ctx)
    try {
      const { nrics } = req.body
      // Validate the NRICs array (this is a basic example)
      if (
        !Array.isArray(nrics) ||
        !nrics.every((nric) => typeof nric === 'string')
      ) {
        return res.status(400).json({ error: 'Invalid input' })
      }
      const result = await caller.me.killUser({ nrics })
      await caller.me.sendDeceasedAuthorNotes({ nrics })

      res.status(200).json({ message: 'NRICs processed successfully', result })
    } catch (error) {
      if (error instanceof TRPCError) {
        // An error from tRPC occured
        const httpCode = getHTTPStatusCodeFromError(error)
        return res.status(httpCode).json(error)
      }
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
