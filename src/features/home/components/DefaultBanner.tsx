import { Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useMe } from '~/features/me/api'
export const DefaultBanner = () => {
  const { me } = useMe()
  return (
    <Flex
      px="1.5rem"
      justifyContent="space-between"
      alignItems="flex-end"
      alignSelf="stretch"
      color="base.content.strong"
    >
      <Text textStyle="banner">Good afternoon, {me.name}</Text>
      <Image
        src="/assets/Webapp-Graphic.svg"
        alt="banner"
        width={154}
        height={80}
      ></Image>
    </Flex>
  )
}
