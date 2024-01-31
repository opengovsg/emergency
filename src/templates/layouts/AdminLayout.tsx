import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import { EnforceLoginStatePageWrapper } from '~/components/AuthWrappers'
import { env } from '~/env.mjs'
import { type GetLayout } from '~/lib/types'
export const AdminLayout: GetLayout = (page) => {
  return (
    <>
      <Head>
        <title>{env.NEXT_PUBLIC_APP_NAME}</title>
        <link rel="icon" href="/Favicon.svg" />
      </Head>
      <EnforceLoginStatePageWrapper>
        <Flex
          minH="$100vh"
          flexDir="column"
          bg="base.canvas.alt"
          pos="relative"
        >
          <Flex flex={1} bg="base.canvas.alt">
            {page}
          </Flex>
        </Flex>
      </EnforceLoginStatePageWrapper>
    </>
  )
}
