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
          bgColor="#F4333D"
          height="3.25rem"
          size="xs"
          borderRadius="0.5rem"
          variant="outline"
          borderColor="#F4333D"
          isLoading={sgidLoginMutation.isLoading}
          onClick={handleSgidLogin}
          aria-label="Log in with Singpass app"
        >
          <Flex align="center" flexDirection="row" aria-hidden>
            <Text
              fontSize="1.125rem"
              fontWeight="700"
              lineHeight="2.25rem"
              textColor="base.content.inverse"
            >
              Log in with{' '}
            </Text>
            {/* Negative margin so the svg sits on the same line as the text */}
            <Box mb="-3px">
              <SingpassFullLogo color="#FFFFFF" height="1rem" />
            </Box>
          </Flex>
        </Button>
      </Stack>
    </>
  )
}
