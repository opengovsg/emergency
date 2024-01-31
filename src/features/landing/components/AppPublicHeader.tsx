import { Flex, Text, type As } from '@chakra-ui/react'
import Image from 'next/image'
import { AppGrid } from '~/templates/AppGrid'

type PublicHeaderLinkProps = {
  label: string
  href: string
  showOnMobile?: boolean
  MobileIcon?: As
}

export interface AppPublicHeaderProps {
  /** Header links to display, if provided. */
  publicHeaderLinks?: PublicHeaderLinkProps[]
}

// const PublicHeaderLink = ({
//   showOnMobile,
//   MobileIcon,
//   href,
//   label,
// }: PublicHeaderLinkProps) => {
//   const isMobile = useIsMobile()

//   if (isMobile && !showOnMobile) {
//     return null
//   }

//   if (isMobile && MobileIcon) {
//     return (
//       <IconButton
//         variant="clear"
//         as={NextLink}
//         href={href}
//         aria-label={label}
//         icon={<MobileIcon fontSize="1.25rem" color="primary.500" />}
//       />
//     )
//   }

//   return (
//     <Link
//       as={NextLink}
//       w="fit-content"
//       variant="standalone"
//       color="primary.500"
//       href={href}
//       aria-label={label}
//     >
//       {label}
//     </Link>
//   )
// }

export const AppPublicHeader = ({}: AppPublicHeaderProps): JSX.Element => {
  return (
    <AppGrid px="1.5rem" bg="white">
      <Flex
        gridColumn={{ base: '1 / -1', md: '2 / 12' }}
        justify="space-between"
        align="center"
        py={{ base: '0.625rem', md: '4.5rem' }}
      >
        <Flex alignItems="flex-end" gap="0.75rem">
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
        <Flex alignItems="center" gap="1.5rem" textStyle="body-1">
          <Text as="a" href="/">
            FAQ
          </Text>
          <Text as="a" href="/terms">
            Terms of Use
          </Text>
          <Text as="a" href="/report">
            Report Vulnerability
          </Text>
          <Text as="a" href="/contact">
            Contact Us
          </Text>
        </Flex>
      </Flex>
    </AppGrid>
  )
}
