import { BlockStack, Card, Text } from '@shopify/polaris';
import type { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card>
      <BlockStack gap="200">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text as="h3" variant="headingSm" fontWeight="medium">
            {title}
          </Text>
          {icon}
        </div>
        <Text as="p" variant="headingLg" fontWeight="bold">
          {value}
        </Text>
      </BlockStack>
    </Card>
  );
}
