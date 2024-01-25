import { Flex, Icon } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BiArrowBack } from 'react-icons/bi'

export const BackBanner = () => {
  const router = useRouter()
  return (
    <Flex
      pt="1.5rem"
      pr="1.5rem"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex
        alignItems="center"
        flexDir="column"
        justifyContent="center"
        px="1rem"
        py="0.5rem"
      >
        <Icon
          as={BiArrowBack}
          w="1.25rem"
          h="1.25rem"
          onClick={() => router.back()}
          cursor="pointer"
        />
      </Flex>
      <Image src="/assets/banner.svg" width={139} height={72} alt="Banner" />
    </Flex>
  )
}
