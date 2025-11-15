import { Card as PolarisCard, type CardProps } from '@shopify/polaris'
import type { ReactNode } from 'react'

interface CustomCardProps extends Omit<CardProps, 'children'> {
  children?: ReactNode
}

export function CustomCard({ children, ...props }: CustomCardProps) {
  return <PolarisCard {...props}>{children}</PolarisCard>
}
