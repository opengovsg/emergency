import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react'
import { RestrictedFooter } from '@opengovsg/design-system-react'
import { FOOTER_LINKS } from '~/constants/footer'
import { AppPublicHeader, LandingSection } from '~/features/landing/components'
import {
  SgidLoginButton,
  SignInContextProvider,
} from '~/features/sign-in/components'
import { AppGrid } from '~/templates/AppGrid'

const accordionItems = [
  {
    text: 'How does e-Notes ensure that my messages are delivered aftermy passing?',
    panel:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.',
  },
  {
    text: 'What kind of messages can I send, and are there any restrictions?',
    panel:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.',
  },
  {
    text: 'How will my data and privacy be protected by e-Notes?',
    panel:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.',
  },
  {
    text: 'Can I update or delete my messages after I’ve set it up?',
    panel:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.',
  },
  {
    text: 'What happens if the designed recipient is not available to receive the message?',
    panel:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.',
  },
]

const LandingPage = () => {
  // const isMobile = useIsMobile()
  return (
    <>
      <AppPublicHeader />
      <LandingSection bg="white" pt={{ base: '2rem', md: 0 }} px={0}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          spacing={{ base: '1.5rem', md: '3.125rem', lg: '7.5rem' }}
        >
          <Flex flexDir="column" flex={1}>
            <Text textStyle="h3" color="blue.600">
              Write or read emergency notes from your loved ones
            </Text>
          </Flex>
        </Stack>
        <Stack py="2rem">
          <SignInContextProvider>
            <SgidLoginButton />
          </SignInContextProvider>
        </Stack>
        <Accordion allowMultiple>
          {accordionItems.map((item, key) => (
            <AccordionItem key={key}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Text textStyle="caption-2">{item.text}</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{item.panel}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </LandingSection>
      <AppGrid bg="base.canvas.brand-subtle" px="1.5rem">
        <Box gridColumn={{ base: '1 / -1', md: '2 / 12' }}>
          <RestrictedFooter
            // This component can only be used if this is an application created by OGP.
            containerProps={{
              px: 0,
            }}
            appName="eNotes"
            appLink="/"
            footerLinks={FOOTER_LINKS}
          />
        </Box>
      </AppGrid>
    </>
  )
}

export default LandingPage
