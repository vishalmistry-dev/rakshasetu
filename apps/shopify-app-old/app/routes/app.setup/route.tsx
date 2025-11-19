import { BlockStack, Card, Page, Text } from '@shopify/polaris';

export default function Setup() {
  const steps = [
    { title: 'Install app', completed: true },
    { title: 'Complete onboarding', completed: false },
    { title: 'Install theme extension', completed: false },
    { title: 'Test checkout flow', completed: false },
  ];

  return (
    <Page title="Setup Guide">
      <Card>
        <BlockStack gap="400">
          <Text as="h2" variant="headingMd">
            Complete these steps to get started
          </Text>

          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                border: '1px solid #e1e3e5',
                borderRadius: '8px',
              }}
            >
              <div style={{ color: step.completed ? 'green' : 'gray' }}>
                {step.completed ? '✓' : '○'}
              </div>
              <Text as="p" variant="bodyMd" fontWeight={step.completed ? 'regular' : 'semibold'}>
                {step.title}
              </Text>
            </div>
          ))}
        </BlockStack>
      </Card>
    </Page>
  );
}
