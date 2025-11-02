import { BlockStack, Button, Card, Text } from '@shopify/polaris';
import { useState } from 'react';
import { TextField } from '../../components/ui/TextField';
import { useToast } from '../../components/ui/Toast';

export default function IntegrationSettings() {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [integrations, setIntegrations] = useState({
    metaPixelId: '',
    googleAnalyticsId: '',
    googleAdsConversionId: '',
  });

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving integrations:', integrations);
      showToast('Integration settings saved!');
    } catch (error) {
      showToast('Failed to save integration settings', true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="p" variant="bodyMd">
          Connect third-party tools to track conversions and analytics
        </Text>

        <TextField
          label="Meta Pixel ID"
          value={integrations.metaPixelId}
          onChange={(v) => setIntegrations(p => ({ ...p, metaPixelId: v }))}
          placeholder="123456789012345"
          autoComplete="off"
        />

        <TextField
          label="Google Analytics ID"
          value={integrations.googleAnalyticsId}
          onChange={(v) => setIntegrations(p => ({ ...p, googleAnalyticsId: v }))}
          placeholder="G-XXXXXXXXXX"
          autoComplete="off"
        />

        <TextField
          label="Google Ads Conversion ID"
          value={integrations.googleAdsConversionId}
          onChange={(v) => setIntegrations(p => ({ ...p, googleAdsConversionId: v }))}
          placeholder="AW-XXXXXXXXX"
          autoComplete="off"
        />

        <Button
          variant="primary"
          onClick={handleSave}
          loading={isSaving}
          disabled={isSaving}
        >
          Save Changes
        </Button>
      </BlockStack>
    </Card>
  );
}
