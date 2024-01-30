import {
  Box,
  Container,
  Flex,
  ListItem,
  OrderedList,
  Stack,
  Text,
  type ListItemProps,
} from '@chakra-ui/react'
import { type FC } from 'react'

import { AppFooter } from '~/components/AppFooter'

import { Link } from '~/components/Link'

import {
  SubSectionListItem,
  SubSectionOrderedList,
  SubSubSectionOrderedList,
} from '../terms'

const SectionListItem: FC<ListItemProps> = ({
  children,
  listStyleType = 'decimal',
}) => (
  <ListItem textStyle="body-1" listStyleType={listStyleType} pl="1rem">
    {children}
  </ListItem>
)

const SectionParagraph: FC<ListItemProps> = ({ children }) => (
  <Text mb="1.5rem">{children}</Text>
)

const PrivacyPolicyPage = (): JSX.Element => {
  return (
    <Flex flexDir="column" bg="primary.100">
      <Container color="secondary.700" maxW="85ch" px="2rem" pb="5rem" flex={1}>
        <Stack spacing="5rem">
          <Box as="section">
            <Text textStyle="h1" as="h1" mb="2.5rem">
              Privacy Policy
            </Text>
            <Text mb="1.5rem">
              This Government Agency Privacy Statement (
              <b>{'Privacy Statement'}</b>) must be read in conjunction with the
              Terms of Use that accompany the applicable service you may be
              requesting from us (the <b>{'Service'}</b>).
            </Text>
            <OrderedList spacing="1.5rem" marginInlineStart="1.5rem">
              <SectionListItem>
                <SectionParagraph>
                  Insofar as the Service consists of or is provided to you
                  through a website, please note that:
                </SectionParagraph>
                <SubSectionOrderedList>
                  <SubSectionListItem
                    isNumericMarker
                    prependSequenceMarker="1."
                  >
                    We may use {'cookies'}, where a small data file is sent to
                    your browser to store and track information about you when
                    you enter our websites. The cookie is used to track
                    information such as the number of users and their frequency
                    of use, profiles of users and their preferred sites. While
                    this cookie can tell us when you enter our sites and which
                    pages you visit, it cannot read data off your hard disk.
                  </SubSectionListItem>
                  <SubSectionListItem
                    isNumericMarker
                    prependSequenceMarker="1."
                  >
                    You can choose to accept or decline cookies. Most web
                    browsers automatically accept cookies, but you can usually
                    modify your browser setting to decline cookies if you
                    prefer. This may prevent you from taking full advantage of
                    the website.
                  </SubSectionListItem>
                </SubSectionOrderedList>
              </SectionListItem>
              <SectionListItem>
                We may request/collect certain types of data from you in
                connection with your access or use of the Service. The data that
                may be requested/collected include those identified in the Annex
                herein. Your data may be stored in our servers, systems or
                devices, in the servers, systems or devices of our third party
                service providers or collaborators, or on your device, and may
                be used by us or our third party service providers or
                collaborators to facilitate your access or use of the Service.
                We or our third party service providers or collaborators may
                collect system configuration information and/or traffic
                information (such as an IP address) and/or use information or
                statistical information to operate, maintain or improve the
                Services or the underlying service of the third party service
                provider or collaborator. For the avoidance of doubt, in this
                Privacy Policy, a reference to a third party service provider or
                collaborator includes other third parties who provide a service
                or collaborate with our third party service provider or
                collaborator.
              </SectionListItem>
              <SectionListItem>
                <SectionParagraph>
                  If you provide us with personal data:
                </SectionParagraph>
                <SubSectionOrderedList>
                  <SubSectionListItem
                    isNumericMarker
                    prependSequenceMarker="3."
                  >
                    We may use, disclose and process the data for any one or
                    more of the following purposes:
                    <SubSubSectionOrderedList mt="1.5rem">
                      <SubSectionListItem
                        isNumericMarker
                        prependSequenceMarker="3."
                      >
                        to assist, process and facilitate your access or use of
                        the Service;
                      </SubSectionListItem>
                      <SubSectionListItem
                        isNumericMarker
                        prependSequenceMarker="3."
                      >
                        to administer, process and facilitate any transactions
                        or activities by you, whether with us or any other
                        Public Sector Entity or third party service provider or
                        collaborator, and whether for your own benefit, or for
                        the benefit of a third party on whose behalf you are
                        duly authorized to act;
                      </SubSectionListItem>
                      <SubSectionListItem
                        isNumericMarker
                        prependSequenceMarker="3."
                      >
                        to carry out your instructions or respond to any
                        queries, feedback or complaints provided by (or
                        purported to be provided by) you or on your behalf, or
                        otherwise for the purposes of responding to or dealing
                        with your interactions with us;
                      </SubSectionListItem>
                      <SubSectionListItem
                        isNumericMarker
                        prependSequenceMarker="3."
                      >
                        to monitor and track your usage of the Service, to
                        conduct research, data analytics, surveys, market
                        studies and similar activities, in order to assist us in
                        understanding your interests, concerns and preferences
                        and improving the Service (including any service of a
                        third party service provider or collaborator) and other
                        services and products provided by Public Sector
                        Entities. For the avoidance of doubt, we may also
                        collect, use, disclose and process such information to
                        create reports and produce statistics regarding your
                        transactions with us and your usage of the Services and
                        other services and products provided by Public Sector
                        Entities for record-keeping and reporting or publication
                        purposes (whether internally or externally);
                      </SubSectionListItem>
                      <SubSectionListItem
                        isNumericMarker
                        prependSequenceMarker="3."
                      >
                        for the purposes of storing or creating backups of your
                        data (whether for contingency or business continuity
                        purposes or otherwise), whether within or outside
                        Singapore;
                      </SubSectionListItem>
                      <SubSectionListItem
                        isNumericMarker
                        prependSequenceMarker="3."
                      >
                        to enable us to contact you or communicate with you on
                        any matters relating to your access or use of the
                        Service, including but not limited to the purposes set
                        out above, via email, SMS, instant messaging, push
                        notifications or such other forms of communication that
                        we may introduce from time to time depending on the
                        functionality of the Service and/or your device.
                      </SubSectionListItem>
                    </SubSubSectionOrderedList>
                  </SubSectionListItem>
                  <SubSectionListItem
                    isNumericMarker
                    prependSequenceMarker="3."
                  >
                    We may share necessary data with other Public Sector
                    Entities, and third party service providers in connection
                    with the Service, so as to provide the Service to you in the
                    most efficient and effective way unless such sharing is
                    prohibited by law.
                  </SubSectionListItem>
                  <SubSectionListItem
                    isNumericMarker
                    prependSequenceMarker="3."
                  >
                    We will NOT share your personal data with entities which are
                    not Public Sector Entities, except where such sharing is
                    necessary for such entities to assist us in providing the
                    Service to you or for fulfilling any of the purposes herein.
                  </SubSectionListItem>
                  <SubSectionListItem
                    isNumericMarker
                    prependSequenceMarker="3."
                  >
                    For your convenience, we may also display to you data you
                    had previously supplied us or other Public Sector Entities.
                    This will speed up the transaction and save you the trouble
                    of repeating previous submissions. Should the data be
                    out-of-date, please supply us the latest data.
                  </SubSectionListItem>
                </SubSectionOrderedList>
              </SectionListItem>
              <SectionListItem>
                Please note that we may be required to disclose your data by
                law, including any law governing the use/provision of any
                service of a third party service provider or collaborator.
              </SectionListItem>
              <SectionListItem>
                To safeguard your personal data, all electronic storage and
                transmission of personal data is secured with appropriate
                security technologies.
              </SectionListItem>
              <SectionListItem>
                You may withdraw your consent to the use and disclosure of your
                data by us with reasonable notice and subject to any prevailing
                legal or contractual restrictions; however, doing so may prevent
                the proper functioning of the Service and may also result in the
                cessation of the Service to you.
              </SectionListItem>
              <SectionListItem>
                The Service may contain links to external sites whose data
                protection and privacy practices may differ from ours. We are
                not responsible for the content and privacy practices of these
                other websites and encourage you to consult the privacy notices
                of those sites.
              </SectionListItem>
              <SectionListItem>
                Please see the Annex for additional terms/notices.
              </SectionListItem>
              <SectionListItem>
                <SectionParagraph>
                  Please contact{' '}
                  <Link isExternal href="mailto:support@eNotes.gov.sg">
                    support@eNotes.gov.sg
                  </Link>{' '}
                  if you:
                </SectionParagraph>
                <SubSectionOrderedList>
                  <SubSectionListItem
                    isNumericMarker
                    prependSequenceMarker="9."
                  >
                    have any enquiries or feedback on our data protection
                    policies and procedures; or
                  </SubSectionListItem>
                  <SubSectionListItem
                    isNumericMarker
                    prependSequenceMarker="9."
                  >
                    need more information on or access to data which you have
                    provided to us in the past.
                  </SubSectionListItem>
                </SubSectionOrderedList>
              </SectionListItem>
            </OrderedList>
            <Text mt="2rem">This Privacy Policy is dated 30 Jan 2024.</Text>
          </Box>
        </Stack>
      </Container>
      <AppFooter />
    </Flex>
  )
}

export default PrivacyPolicyPage
