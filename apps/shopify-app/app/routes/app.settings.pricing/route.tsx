import { BlockStack, Button, Card, InlineGrid, Text } from '@shopify/polaris';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { TextField } from '../../components/ui/TextField';
import { useToast } from '../../components/ui/Toast';
import { merchantsApi } from '../../lib/api/merchants';

export default function PricingSettings() {
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const shop = searchParams.get('shop') || '';
  const [isSaving, setIsSaving] = useState(false);

  const [fees, setFees] = useState({
    codFee: '30',
    podFee: '30',
    prepaidFee: '20',
    partialFee: '25',
  });

  const handleSave = async () => {
    if (!shop) {
      showToast('Shop parameter is missing', true);
      return;
    }

    setIsSaving(true);

    try {
      await merchantsApi.updateSettings(shop, 'preferences', fees);
      showToast('Pricing updated successfully!');
    } catch (error) {
      showToast('Failed to update pricing', true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="p" variant="bodyMd">
          Set your per-order fees for different payment methods
        </Text>

        <InlineGrid columns={2} gap="400">
          <TextField
            label="COD Fee (₹)"
            value={fees.codFee}
            onChange={(value) => setFees(prev => ({ ...prev, codFee: value }))}
            type="number"
            autoComplete="off"
          />

          <TextField
            label="POD Fee (₹)"
            value={fees.podFee}
            onChange={(value) => setFees(prev => ({ ...prev, podFee: value }))}
            type="number"
            autoComplete="off"
          />

          <TextField
            label="Prepaid Fee (₹)"
            value={fees.prepaidFee}
            onChange={(value) => setFees(prev => ({ ...prev, prepaidFee: value }))}
            type="number"
            autoComplete="off"
          />

          <TextField
            label="Partial Payment Fee (₹)"
            value={fees.partialFee}
            onChange={(value) => setFees(prev => ({ ...prev, partialFee: value }))}
            type="number"
            autoComplete="off"
          />
        </InlineGrid>

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
