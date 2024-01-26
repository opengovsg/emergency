import { useMemo } from 'react'
import { InitialLoginStep } from './InitialLoginStep'
import { Flex } from '@chakra-ui/react'

export const CurrentLoginStep = (): JSX.Element => {
  const stepToRender = useMemo(() => {
    return <InitialLoginStep />
  }, [])

  return (
    // Fixed height so the page can be (relatively) centered without any layout shift.
    <Flex w="100%" h={{ lg: '16rem' }}>
      {stepToRender}
    </Flex>
  )
}
