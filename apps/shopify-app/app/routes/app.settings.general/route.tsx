import { BlockStack, Button, Card, Checkbox } from '@shopify/polaris';
import { useState } from 'react';
import { Select } from '../../components/ui/Select';
import { COURIER_PARTNERS } from '../../lib/utils/constants';

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    autoConfirmOrders: true,
    sendNotifications: true,
    defaultCourier: 'BLUEDART',
  });

  const handleSave = () => {
    console.log('Saving general settings:', settings);
    // Will connect to API later
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

        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </BlockStack>
    </Card>
  );
}
