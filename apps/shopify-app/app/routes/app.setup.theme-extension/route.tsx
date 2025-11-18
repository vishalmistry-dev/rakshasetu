import { BlockStack, Button, Card, List, Page, Text } from '@shopify/polaris';

export default function ThemeExtensionSetup() {
  return (
    <Page
      title="Install Theme Extension"
      backAction={{ content: 'Setup', url: '/app/setup' }}
    >
      <BlockStack gap="400">
        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              Step 1: Go to your theme editor
            </Text>
            <Button url="https://admin.shopify.com/themes" external>
              Open Theme Editor
            </Button>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              Step 2: Enable app embed
            </Text>
            <List type="number">
              <List.Item>In the theme editor, click on &quot;App embeds&quot; in the left sidebar</List.Item>
              <List.Item>Find &quot;Rakshasetu Checkout&quot; in the list</List.Item>
              <List.Item>Toggle it ON</List.Item>
              <List.Item>Click &quot;Save&quot; in the top right</List.Item>
            </List>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="300">
            <Text as="h2" variant="headingMd">
              Step 3: Test it
            </Text>
            <Text as="p" variant="bodyMd">
              Go to your store, add a product to cart, and click checkout. You should see the Rakshasetu payment options.
            </Text>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}
