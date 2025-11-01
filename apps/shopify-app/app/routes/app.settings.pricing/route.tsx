import { BlockStack, Button, Card, InlineGrid, Text } from '@shopify/polaris';
import { useState } from 'react';
import { TextField } from '../../components/ui/TextField';

export default function PricingSettings() {
  const [fees, setFees] = useState({
    codFee: '30',
    podFee: '30',
    prepaidFee: '20',
    partialFee: '25',
  });

  const handleSave = () => {
    console.log('Saving pricing:', fees);
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

        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </BlockStack>
    </Card>
  );
}
