import type { CardProps } from '@shopify/polaris';
import { Card as PolarisCard } from '@shopify/polaris';

interface CustomCardProps extends CardProps {
  children: React.ReactNode;
}

export function Card({ children, ...props }: CustomCardProps) {
  return <PolarisCard {...props}>{children}</PolarisCard>;
}
