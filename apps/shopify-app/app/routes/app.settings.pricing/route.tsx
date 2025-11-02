import { BlockStack, Button, Card, InlineGrid, Text } from '@shopify/polaris';
import { useState } from 'react';
import { TextField } from '../../components/ui/TextField';
import { useToast } from '../../components/ui/Toast';

export default function PricingSettings() {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [fees, setFees] = useState({
    codFee: '30',
    podFee: '30',
    prepaidFee: '20',
    partialFee: '25',
  });

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving pricing:', fees);
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
