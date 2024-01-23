import { useRouter } from 'next/router'

import { FullscreenSpinner } from '~/components/FullscreenSpinner'
import { useLoginState } from '~/features/auth'
import { trpc } from '~/utils/trpc'

/**
 * This component is responsible for handling the callback from the SGID login.
 */
export const SgidCallback = (): JSX.Element => {
  const { setHasLoginStateFlag } = useLoginState()

  const router = useRouter()
  const utils = trpc.useContext()

  const {
    query: { code, state },
  } = router

  trpc.auth.sgid.callback.useSuspenseQuery(
    {
      code: String(code),
      state: String(state),
    },
    {
      retry: 0,
      onSuccess: ({ redirectUrl }) => {
        setHasLoginStateFlag()
        void utils.me.get.invalidate()
        void router.replace(redirectUrl)
      },
      onError: (error) => {
        console.error(error)
        void router.replace(`/sign-in?error=${error.message}`)
      },
    },
  )
  return <FullscreenSpinner />
}
