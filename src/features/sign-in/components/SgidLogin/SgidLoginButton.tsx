import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import { useRouter } from 'next/router'
import { SingpassFullLogo } from '~/components/Svg/SingpassFullLogo'
import { trpc } from '~/utils/trpc'
import { getRedirectUrl } from '~/utils/url'

export const SgidLoginButton = (): JSX.Element | null => {
  const router = useRouter()
  const sgidLoginMutation = trpc.auth.sgid.login.useMutation({
    onSuccess: async ({ redirectUrl }) => {
      await router.push(redirectUrl)
    },
  })

  const landingUrl = getRedirectUrl(router.query)

  const handleSgidLogin = () => {
    return sgidLoginMutation.mutate({
      landingUrl,
    })
  }

  return (
    <>
      <Stack gap="0.75rem">
        <Button
          colorScheme="neutral"
          bgColor="grey.900"
          height="2.75rem"
          size="xs"
          variant="outline"
          isLoading={sgidLoginMutation.isLoading}
          onClick={handleSgidLogin}
          aria-label="Log in with Singpass app"
        >
          <Flex align="center" flexDirection="row" aria-hidden>
            <Text textStyle="subhead-2" textColor="base.content.inverse">
              Log in with{' '}
            </Text>
            {/* Negative margin so the svg sits on the same line as the text */}
            <Box mb="-3px">
              <SingpassFullLogo color="#E04240" height="1rem" />
            </Box>
            <Text textStyle="subhead-2" textColor="base.content.inverse">
              {' '}
              app
            </Text>
          </Flex>
        </Button>
      </Stack>
    </>
  )
}
