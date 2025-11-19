import { BlockStack, Button, Card, InlineStack, Page, Text } from '@shopify/polaris';

export default function Help() {
  const faqs = [
    {
      q: 'How do I process COD orders?',
      a: 'COD orders are automatically created when customers select Cash on Delivery. You can manage them in the full dashboard.',
    },
    {
      q: 'When do I receive settlements?',
      a: 'Settlements are processed weekly after successful delivery confirmation. You can view pending settlements in your account.',
    },
    {
      q: 'How do I handle returns?',
      a: 'Returns can be managed from the full dashboard. Configure your return policy in Settings → Returns.',
    },
  ];

  return (
    <Page title="Help & Support">
      <BlockStack gap="500">
        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              Frequently Asked Questions
            </Text>

            {faqs.map((faq, index) => (
              <BlockStack key={index} gap="200">
                <Text as="h3" variant="headingSm" fontWeight="semibold">
                  {faq.q}
                </Text>
                <Text as="p" variant="bodyMd">
                  {faq.a}
                </Text>
              </BlockStack>
            ))}
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              Need More Help?
            </Text>

            <InlineStack gap="300">
              <Button url="https://docs.rakshasetu.com" external>
                Documentation
              </Button>
              <Button url="mailto:support@rakshasetu.com">
                Contact Support
              </Button>
            </InlineStack>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}
