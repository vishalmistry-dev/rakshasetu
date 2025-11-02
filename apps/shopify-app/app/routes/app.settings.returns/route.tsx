import { BlockStack, Button, Card, Checkbox, InlineGrid } from '@shopify/polaris';
import { useState } from 'react';
import { Select } from '../../components/ui/Select';
import { TextField } from '../../components/ui/TextField';
import { useToast } from '../../components/ui/Toast';

export default function ReturnSettings() {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    returnsEnabled: true,
    returnWindowDays: '7',
    returnShippingPaidBy: 'MERCHANT',
    qcRequired: false,
    exchangesEnabled: false,
  });

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving return settings:', settings);
      showToast('Return settings saved!');
    } catch (error) {
      showToast('Failed to save return settings', true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <BlockStack gap="500">
        <Checkbox
          label="Enable returns"
          checked={settings.returnsEnabled}
          onChange={(v) => setSettings(p => ({ ...p, returnsEnabled: v }))}
        />

        <InlineGrid columns={2} gap="400">
          <TextField
            label="Return window (days)"
            value={settings.returnWindowDays}
            onChange={(v) => setSettings(p => ({ ...p, returnWindowDays: v }))}
            type="number"
            autoComplete="off"
            disabled={!settings.returnsEnabled}
          />

          <Select
            label="Return shipping paid by"
            options={[
              { label: 'Merchant', value: 'MERCHANT' },
              { label: 'Customer', value: 'CUSTOMER' },
              { label: 'Split (50-50)', value: 'SPLIT' },
            ]}
            value={settings.returnShippingPaidBy}
            onChange={(v) => setSettings(p => ({ ...p, returnShippingPaidBy: v }))}
            disabled={!settings.returnsEnabled}
          />
        </InlineGrid>

        <Checkbox
          label="Quality check required before refund"
          checked={settings.qcRequired}
          onChange={(v) => setSettings(p => ({ ...p, qcRequired: v }))}
          disabled={!settings.returnsEnabled}
        />

        <Checkbox
          label="Enable exchanges"
          checked={settings.exchangesEnabled}
          onChange={(v) => setSettings(p => ({ ...p, exchangesEnabled: v }))}
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
