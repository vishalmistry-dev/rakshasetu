import {
  BlockStack,
  Button,
  Card,
  Checkbox,
  InlineGrid,
  Layout,
  Page,
  Text,
} from '@shopify/polaris';
import { useState } from 'react';
import { redirect, useNavigate } from 'react-router';
import { Select } from '../../components/ui/Select';
import { TextField } from '../../components/ui/TextField';
import { merchantsApi } from '../../lib/api/merchants';
import { BUSINESS_TYPES, INDIAN_STATES } from '../../lib/utils/constants';
import { authenticate } from '../../shopify.server';

export async function action({ request }: { request: Request }) {
  await authenticate.admin(request);
  const formData = await request.formData();

  const data = {
    businessName: formData.get('businessName') as string,
    businessType: formData.get('businessType') as string,
    gstNumber: formData.get('gstNumber') as string,
    panNumber: formData.get('panNumber') as string,
    phone: formData.get('phone') as string,
    pickupAddress: {
      line1: formData.get('pickupLine1') as string,
      line2: formData.get('pickupLine2') as string,
      city: formData.get('pickupCity') as string,
      state: formData.get('pickupState') as string,
      pincode: formData.get('pickupPincode') as string,
      country: 'India',
      type: 'PICKUP' as const,
    },
    sameAsPickup: formData.get('sameAsPickup') === 'true',
    bankAccount: formData.get('bankAccount') as string,
    confirmBankAccount: formData.get('bankAccount') as string,
    ifscCode: formData.get('ifscCode') as string,
    accountHolder: formData.get('accountHolder') as string,
    pricingPlan: formData.get('pricingPlan') as 'PER_ORDER' | 'SUBSCRIPTION',
    agreeToTerms: formData.get('agreeToTerms') === 'true',
    authorizeCollection: formData.get('authorizeCollection') === 'true',
  };

  await merchantsApi.onboard(data);

  return redirect('/app');
}

export default function Onboarding() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    gstNumber: '',
    panNumber: '',
    phone: '',
    pickupLine1: '',
    pickupLine2: '',
    pickupCity: '',
    pickupState: '',
    pickupPincode: '',
    sameAsPickup: true,
    bankAccount: '',
    ifscCode: '',
    accountHolder: '',
    pricingPlan: 'PER_ORDER',
    agreeToTerms: false,
    authorizeCollection: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Page
      title="Complete Your Setup"
      backAction={{ content: 'Dashboard', onAction: () => navigate('/app') }}
    >
      <form method="post">
        <Layout>
          <Layout.Section>
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">
                    Business Information
                  </Text>

                  <TextField
                    label="Business Name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={(value) => handleChange('businessName', value)}
                    autoComplete="off"
                    requiredIndicator
                  />

                  <Select
                    label="Business Type"
                    name="businessType"
                    options={[
                      { label: 'Select type', value: '' },
                      ...BUSINESS_TYPES.map((t) => ({ label: t.label, value: t.value })),
                    ]}
                    value={formData.businessType}
                    onChange={(value) => handleChange('businessType', value)}
                    requiredIndicator
                  />

                  <InlineGrid columns={2} gap="400">
                    <TextField
                      label="GST Number"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={(value) => handleChange('gstNumber', value)}
                      autoComplete="off"
                      requiredIndicator
                    />

                    <TextField
                      label="PAN Number"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={(value) => handleChange('panNumber', value)}
                      autoComplete="off"
                      requiredIndicator
                    />
                  </InlineGrid>

                  <TextField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(value) => handleChange('phone', value)}
                    autoComplete="tel"
                    requiredIndicator
                  />
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">
                    Pickup Address (Warehouse)
                  </Text>

                  <TextField
                    label="Address Line 1"
                    name="pickupLine1"
                    value={formData.pickupLine1}
                    onChange={(value) => handleChange('pickupLine1', value)}
                    autoComplete="off"
                    requiredIndicator
                  />

                  <TextField
                    label="Address Line 2"
                    name="pickupLine2"
                    value={formData.pickupLine2}
                    onChange={(value) => handleChange('pickupLine2', value)}
                    autoComplete="off"
                  />

                  <InlineGrid columns={2} gap="400">
                    <TextField
                      label="City"
                      name="pickupCity"
                      value={formData.pickupCity}
                      onChange={(value) => handleChange('pickupCity', value)}
                      autoComplete="off"
                      requiredIndicator
                    />

                    <Select
                      label="State"
                      name="pickupState"
                      options={[
                        { label: 'Select state', value: '' },
                        ...INDIAN_STATES.map((s) => ({ label: s, value: s })),
                      ]}
                      value={formData.pickupState}
                      onChange={(value) => handleChange('pickupState', value)}
                      requiredIndicator
                    />
                  </InlineGrid>

                  <TextField
                    label="Pincode"
                    name="pickupPincode"
                    value={formData.pickupPincode}
                    onChange={(value) => handleChange('pickupPincode', value)}
                    autoComplete="off"
                    requiredIndicator
                  />

                  <Checkbox
                    label="Use same address for returns"
                    checked={formData.sameAsPickup}
                    onChange={(value) => handleChange('sameAsPickup', value)}
                  />
                  <input type="hidden" name="sameAsPickup" value={String(formData.sameAsPickup)} />
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">
                    Bank Details
                  </Text>

                  <TextField
                    label="Account Holder Name"
                    name="accountHolder"
                    value={formData.accountHolder}
                    onChange={(value) => handleChange('accountHolder', value)}
                    autoComplete="off"
                    requiredIndicator
                  />

                  <TextField
                    label="Account Number"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={(value) => handleChange('bankAccount', value)}
                    autoComplete="off"
                    requiredIndicator
                  />

                  <TextField
                    label="IFSC Code"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={(value) => handleChange('ifscCode', value)}
                    autoComplete="off"
                    requiredIndicator
                  />
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="400">
                  <Checkbox
                    label="I agree to Rakshasetu's merchant terms and conditions"
                    checked={formData.agreeToTerms}
                    onChange={(value) => handleChange('agreeToTerms', value)}
                  />
                  <input type="hidden" name="agreeToTerms" value={String(formData.agreeToTerms)} />

                  <Checkbox
                    label="I authorize Rakshasetu to collect COD/POD payments on my behalf"
                    checked={formData.authorizeCollection}
                    onChange={(value) => handleChange('authorizeCollection', value)}
                  />
                  <input type="hidden" name="authorizeCollection" value={String(formData.authorizeCollection)} />
                </BlockStack>
              </Card>

              <input type="hidden" name="pricingPlan" value={formData.pricingPlan} />

              <Button
                variant="primary"
                size="large"
                submit
                disabled={!formData.agreeToTerms || !formData.authorizeCollection}
              >
                Complete Setup
              </Button>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </form>
    </Page>
  );
}
