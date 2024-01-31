import { Flex, HStack, Icon, Show, Text } from '@chakra-ui/react'
import { Menu, useIsMobile } from '@opengovsg/design-system-react'
import Image from 'next/image'
import { BiMenu } from 'react-icons/bi'
import { ADMIN_NAVBAR_HEIGHT } from '~/constants/layouts'
const LINKS = [
  {
    label: 'FAQ',
    href: '/faq',
  },
  {
    label: 'Terms of Use',
    href: '/terms',
  },
  {
    label: 'Report Vulnerability',
    href: 'https://www.tech.gov.sg/report_vulnerability',
  },
  {
    label: 'Contact Us',
    href: '/contact',
  },
]

const NavbarMenu = () => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <Menu.Button
            // TODO: Extract into application theme layer if repeated
            colorScheme="black"
            variant="clear"
            rightIcon={undefined}
            size="lg"
            px="0.75rem"
            // Constrain width even with border in smaller viewports
            w={{ base: '3rem', sm: 'auto' }}
            sx={{ justifyContent: 'center' }}
            alignSelf="center"
            iconSpacing={{ base: 0, sm: '0.25rem' }}
            leftIcon={<Icon as={BiMenu} fontSize="1.5rem" />}
            isOpen={isOpen}
          >
            <Show above="sm"></Show>
          </Menu.Button>
          <Menu.List>
            {LINKS.map((link) => (
              <Menu.Item
                as="a"
                href={link.href}
                key={link.label}
                textStyle="body-1"
              >
                {link.label}
              </Menu.Item>
            ))}
          </Menu.List>
        </>
      )}
    </Menu>
  )
}

export const AppNavbar = (): JSX.Element => {
  const isMobile = useIsMobile()
  return (
    <Flex flex="0 0 auto" gridColumn="1/-1" height={ADMIN_NAVBAR_HEIGHT}>
      <Flex
        zIndex="docked"
        w="100%"
        justify="space-between"
        align="center"
        px={{ base: '1.5rem', md: '1.8rem', xl: '2rem' }}
        py="0.375rem"
        transition="padding 0.1s"
      >
        <Flex alignItems="flex-end" gap="0.75rem" as="a" href="/">
          <Image
            src="/assets/Logo.svg"
            width={36}
            height={36}
            alt="Logo small"
          />
          <Text
            fontSize="1.5rem"
            fontWeight="500"
            lineHeight="2.1rem"
            color="blue.700"
          >
            eNotes
          </Text>
        </Flex>
        <HStack textStyle="body-1" spacing={{ base: '0.75rem', md: '1.5rem' }}>
          {isMobile ? (
            <NavbarMenu />
          ) : (
            LINKS.map((link) => (
              <Text as="a" href={link.href} key={link.label}>
                {link.label}
              </Text>
            ))
          )}
        </HStack>
      </Flex>
    </Flex>
  )
}
