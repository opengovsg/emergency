import { Flex, Icon } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BiArrowBack } from 'react-icons/bi'

export const BackBanner = () => {
  const router = useRouter()
  return (
    <Flex
      w="22.5rem"
      pt="1.5rem"
      pr="1.5rem"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex alignItems="center">
        <Icon
          as={BiArrowBack}
          w="1.25rem"
          h="1.25rem"
          onClick={() => router.back()}
        />
      </Flex>
      <Image src="/assets/banner.svg" width={139} height={72} alt="Banner" />
    </Flex>
  )
}
