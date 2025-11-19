import { BlockStack, Spinner, Text } from '@shopify/polaris';

interface LoadingProps {
  message?: string;
}

export function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px'
    }}>
      <BlockStack gap="300" align="center">
        <Spinner size="large" />
        <Text as="p" variant="bodyMd" tone="subdued">
          {message}
        </Text>
      </BlockStack>
    </div>
  );
}
