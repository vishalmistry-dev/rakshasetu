import { BlockStack, Button, Card, Checkbox, Text } from '@shopify/polaris';
import { useState } from 'react';
import { TextField } from '../../components/ui/TextField';
import { useToast } from '../../components/ui/Toast';

export default function NotificationSettings() {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    emailEnabled: true,
    whatsappEnabled: true,
    smsEnabled: false,
    notifyOnNewOrder: true,
    notifyOnShipment: true,
    notifyOnDelivery: true,
    notificationEmail: '',
  });

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving notification settings:', settings);
      showToast('Notification settings saved!');
    } catch (error) {
      showToast('Failed to save notification settings', true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <BlockStack gap="500">
        <BlockStack gap="300">
          <Text as="h3" variant="headingSm">Channels</Text>
          <Checkbox
            label="Email notifications"
            checked={settings.emailEnabled}
            onChange={(v) => setSettings(p => ({ ...p, emailEnabled: v }))}
          />
          <Checkbox
            label="WhatsApp notifications"
            checked={settings.whatsappEnabled}
            onChange={(v) => setSettings(p => ({ ...p, whatsappEnabled: v }))}
          />
          <Checkbox
            label="SMS notifications"
            checked={settings.smsEnabled}
            onChange={(v) => setSettings(p => ({ ...p, smsEnabled: v }))}
          />
        </BlockStack>

        <BlockStack gap="300">
          <Text as="h3" variant="headingSm">Events</Text>
          <Checkbox
            label="New order received"
            checked={settings.notifyOnNewOrder}
            onChange={(v) => setSettings(p => ({ ...p, notifyOnNewOrder: v }))}
          />
          <Checkbox
            label="Order shipped"
            checked={settings.notifyOnShipment}
            onChange={(v) => setSettings(p => ({ ...p, notifyOnShipment: v }))}
          />
          <Checkbox
            label="Order delivered"
            checked={settings.notifyOnDelivery}
            onChange={(v) => setSettings(p => ({ ...p, notifyOnDelivery: v }))}
          />
        </BlockStack>

        <TextField
          label="Notification email (if different from account email)"
          value={settings.notificationEmail}
          onChange={(v) => setSettings(p => ({ ...p, notificationEmail: v }))}
          type="email"
          autoComplete="email"
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
