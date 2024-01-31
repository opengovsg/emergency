import { Card, Flex, Icon, Text } from '@chakra-ui/react'
import { type IconType } from 'react-icons'

interface FeatureGridItemProps {
  icon?: IconType
  title: string
  description1: string
  description2: string
}

export const FeatureGridItem = ({
  icon,
  title,
  description1,
  description2,
}: FeatureGridItemProps): JSX.Element => {
  return (
    <Card gap="2rem" p="2rem" alignItems="flex-start" boxShadow="sm">
      <Flex gap="0.5rem" alignItems="center">
        {icon && (
          <Icon
            width="1.5rem"
            height="1.5rem"
            as={icon}
            aria-hidden
            color="base.content.brand"
          />
        )}
        <Text as="h5" textStyle="h5" color="base.content.strong">
          {title}
        </Text>
      </Flex>
      <Text textStyle="body-1">{description1}</Text>
      <Text textStyle="body-1">{description2}</Text>
    </Card>
  )
}
