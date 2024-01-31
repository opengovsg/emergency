import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useIsMobile } from '@opengovsg/design-system-react'
import { AppFooter } from '~/components/AppFooter'
import { AppNavbar } from '~/components/AppNavbar'
import { ALL_FAQ } from '~/constants/faq'

const FAQPage = () => {
  const isMobile = useIsMobile()
  return (
    <>
      <AppNavbar />
      <Flex flexDir="column" bg="primary.100">
        <Container color="secondary.700" maxW="85ch" p="2rem" flex={1}>
          <Stack spacing="5rem">
            <Box as="section">
              <Text textStyle="h1" as="h1" mb="2.5rem">
                Frequently Asked Questions
              </Text>
              <Flex
                flex={1.5}
                aria-hidden
                justify="center"
                flexDir="column"
                gap="2rem"
              >
                <Accordion allowMultiple>
                  {ALL_FAQ.map((item, key) => (
                    <AccordionItem
                      key={key}
                      py={isMobile ? '0.75rem' : '1.25rem'}
                    >
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
              </Flex>
            </Box>
          </Stack>
        </Container>
      </Flex>
      <AppFooter />
    </>
  )
}
export default FAQPage
