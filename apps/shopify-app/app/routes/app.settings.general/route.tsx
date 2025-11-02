import { BlockStack, Button, Card, Checkbox } from '@shopify/polaris';
import { useState } from 'react';
import { Select } from '../../components/ui/Select';
import { useToast } from '../../components/ui/Toast';
import { COURIER_PARTNERS } from '../../lib/utils/constants';

export default function GeneralSettings() {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    autoConfirmOrders: true,
    sendNotifications: true,
    defaultCourier: 'BLUEDART',
  });

  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving general settings:', settings);
      showToast('Settings saved successfully!');
    } catch (error) {
      showToast('Failed to save settings', true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Checkbox
          label="Auto-confirm orders"
          checked={settings.autoConfirmOrders}
          onChange={(value) => setSettings(prev => ({ ...prev, autoConfirmOrders: value }))}
          helpText="Automatically confirm orders when payment is received"
        />

        <Checkbox
          label="Send notifications"
          checked={settings.sendNotifications}
          onChange={(value) => setSettings(prev => ({ ...prev, sendNotifications: value }))}
          helpText="Send email/SMS notifications for order updates"
        />

        <Select
          label="Default courier partner"
          options={[
            { label: 'Select courier', value: '' },
            ...COURIER_PARTNERS.map(c => ({ label: c.label, value: c.value })),
          ]}
          value={settings.defaultCourier}
          onChange={(value) => setSettings(prev => ({ ...prev, defaultCourier: value }))}
          helpText="Default courier for new orders"
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
