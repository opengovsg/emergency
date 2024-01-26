import { Flex, type As } from '@chakra-ui/react'
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
        justify="center"
        align="center"
        py={{ base: '0.625rem', md: '4.5rem' }}
      >
        <Image src="/assets/banner.svg" width={360} height={225} alt="Banner" />
      </Flex>
    </AppGrid>
  )
}
