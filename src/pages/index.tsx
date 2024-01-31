import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link, useIsMobile } from '@opengovsg/design-system-react'
import { BiLock, BiSolidMagicWand, BiTimeFive } from 'react-icons/bi'
import { AppFooter } from '~/components/AppFooter'
import { AppNavbar } from '~/components/AppNavbar'
import { SHORT_FAQ } from '~/constants/faq'
import {
  FeatureGridItem,
  LandingSection,
  SectionBodyText,
} from '~/features/landing/components'
import {
  SgidLoginButton,
  SignInContextProvider,
} from '~/features/sign-in/components'

const LandingPage = () => {
  const isMobile = useIsMobile()
  return (
    <>
      <Box bgGradient="linear(78deg, #FFF0FD 4.62%, #FAFBFC 89.25%)">
        <AppNavbar />
        <LandingSection p="4.5rem 9.25rem 6 rem 9.25rem">
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            align="center"
            spacing={{ base: '1.5rem', md: '3.125rem', lg: '7.5rem' }}
          >
            <Flex
              flexDir="column"
              flex={1}
              pr={{ base: '1.5rem', md: '5.5rem', lg: '0' }}
              gap="2rem"
            >
              <Text
                textStyle={isMobile ? 'h3' : 'h1'}
                color="base.content.strong"
              >
                Leave essential instructions for your loved ones today
              </Text>
              <Stack gap="1rem">
                <SectionBodyText>
                  eNotes makes it simple and secure to leave important messages
                  for your loved ones.
                </SectionBodyText>
                <SectionBodyText>
                  Simply write your note, and select when it should be sent, and
                  we’ll ensure your essential instructions and thoughts are
                  delivered when they are most needed.
                </SectionBodyText>
              </Stack>
              <Box mt="2.5rem">
                <SignInContextProvider>
                  <SgidLoginButton />
                </SignInContextProvider>
              </Box>
            </Flex>
            <Flex flex={1} aria-hidden justify="right">
              <Image src="/assets/Hero.svg" alt="Hero" />
            </Flex>
          </Stack>
        </LandingSection>
      </Box>
      <LandingSection alignItems="center" p="4.5rem 9.25rem 6 rem 9.25rem">
        <Box
          justifyContent="center"
          gap="0.5rem"
          alignSelf={isMobile ? 'stretch' : ''}
          alignItems="center"
        >
          <Text textStyle="h4" color="base.content.strong">
            Features and benefits
          </Text>
        </Box>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacingX="2rem"
          spacingY="1rem"
          mt={{ base: '1rem', lg: '1.8rem' }}
        >
          <FeatureGridItem
            icon={BiTimeFive}
            title="Timely delivery of notes"
            description1="eNotes enables scheduled note delivery triggered by the user's passing."
            description2="This allows essential information or parting messages to be delivered to note recipients when they matter most."
          />
          <FeatureGridItem
            icon={BiLock}
            title="Secure storage and delivery"
            description1="eNotes makes use of SingPass as an authentication feature, and the notes are stored securely and encrypted."
            description2="This provides greater security that the notes will be passed on to your loved ones, compared to QR codes which could be generated wrongly or expire after your death."
          />
          <FeatureGridItem
            icon={BiSolidMagicWand}
            title="Ease of use and organisation"
            description1="A straightforward interface enables you to compose and dispatch your notes in four easy steps."
            description2="Unlike other cluttered messaging apps,  eNotes keeps all of your important notes in one single, easily accessible location."
          />
        </SimpleGrid>
      </LandingSection>
      <Box bgGradient="linear(78deg, #9DCBEC 4.62%, #FAFBFC 89.25%)">
        <LandingSection p="4.5rem 9.25rem 6 rem 9.25rem">
          <Stack
            direction={{ base: 'column-reverse', lg: 'row' }}
            align="center"
            spacing={{ base: '1.5rem', md: '3.125rem', lg: '7.5rem' }}
          >
            <Flex
              flexDir="column"
              flex={1}
              pr={{ base: '1.5rem', md: '5.5rem', lg: '0' }}
              gap="3rem"
            >
              <Text
                textStyle={isMobile ? 'h4' : 'h2'}
                color="base.content.strong"
              >
                Use eNotes in a few simple steps
              </Text>
              <Stack gap="2rem">
                <Stack gap="0.5rem">
                  <Text textStyle="h5">1. Login with your Singpass</Text>
                  <Text textStyle="body-1">
                    Start using eNotes with your secured Singpass account
                  </Text>
                </Stack>
                <Stack gap="0.5rem">
                  <Text textStyle="h5">2. Select your note recipients</Text>
                  <Text textStyle="body-1">
                    Quickly choose from a list of family members or nominate a
                    recipient using his or NRIC number
                  </Text>
                </Stack>
                <Stack gap="0.5rem">
                  <Text textStyle="h5">3. Write your message</Text>
                  <Text textStyle="body-1">
                    Write down any essential information, instructions or
                    parting messages quickly
                  </Text>
                </Stack>
                <Stack gap="0.5rem">
                  <Text textStyle="h5">4. Select a time of delivery</Text>
                  <Text textStyle="body-1">
                    Choose the timing for delivering your message to your loved
                    ones: either immediately or upon your passing
                  </Text>
                </Stack>
              </Stack>
            </Flex>
            <Flex flex={1} aria-hidden justify="right">
              <Image
                src="/assets/iPhone 15 1.svg"
                alt="Hero"
                width={isMobile ? '7rem' : '18.5rem'}
              />
            </Flex>
          </Stack>
        </LandingSection>
      </Box>
      <LandingSection p="4.5rem 9.25rem 6 rem 9.25rem">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          spacing={{ base: '1.5rem', md: '3.125rem' }}
          alignItems="flex-start"
        >
          <Flex
            flexDir="column"
            flex={1}
            pr={{ base: '1.5rem', md: '5.5rem' }}
            gap="3rem"
          >
            <Text
              textStyle={isMobile ? 'h4' : 'h2'}
              color="base.content.strong"
            >
              Still have questions?
            </Text>
          </Flex>
          <Flex
            flex={1.5}
            aria-hidden
            justify="center"
            flexDir="column"
            gap="2rem"
          >
            <Accordion allowMultiple>
              {SHORT_FAQ.map((item, key) => (
                <AccordionItem key={key} py={isMobile ? '0.75rem' : '1.25rem'}>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        <Text textStyle="subhead-1">{item.text}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>{item.panel}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            <Flex
              px="1rem"
              justify="center"
              alignItems="flex-start"
              gap="0.5rem"
              alignSelf="stretch"
            >
              <Text>
                If you have more questions, please take a look at our FAQ{' '}
                <Link href="/faq">here.</Link>
              </Text>
            </Flex>
          </Flex>
        </Stack>
      </LandingSection>
      <Box bgImage="/assets/Bottom.svg" backgroundSize="cover">
        <LandingSection>
          <Stack alignItems="center" justifyContent="center" gap="2rem">
            <Text textStyle={isMobile ? 'h5' : 'h3-semibold'}>
              Start writing to your loved ones with eNotes today
            </Text>
            <SignInContextProvider>
              <SgidLoginButton />
            </SignInContextProvider>
          </Stack>
        </LandingSection>
      </Box>
      <AppFooter />
    </>
  )
}

export default LandingPage
