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
import { Loading } from '../../components/ui/Loading';
import { Select } from '../../components/ui/Select';
import { TextField } from '../../components/ui/TextField';
import { useToast } from '../../components/ui/Toast';
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
  const { showToast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName) newErrors.businessName = 'Business name is required';
    if (!formData.gstNumber) newErrors.gstNumber = 'GST number is required';
    if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = 'Valid phone number is required';
    if (!formData.pickupLine1) newErrors.pickupLine1 = 'Address is required';
    if (!formData.pickupCity) newErrors.pickupCity = 'City is required';
    if (!formData.pickupState) newErrors.pickupState = 'State is required';
    if (!formData.pickupPincode || formData.pickupPincode.length !== 6) newErrors.pickupPincode = 'Valid 6-digit pincode is required';
    if (!formData.bankAccount) newErrors.bankAccount = 'Account number is required';
    if (!formData.ifscCode) newErrors.ifscCode = 'IFSC code is required';
    if (!formData.accountHolder) newErrors.accountHolder = 'Account holder name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Please fix the errors in the form', true);
      return;
    }

    setIsSubmitting(true);

    try {
      const formElement = e.currentTarget;
      const response = await fetch(formElement.action || window.location.pathname, {
        method: 'POST',
        body: new FormData(formElement),
      });

      if (response.ok) {
        showToast('Onboarding completed successfully!');
        setTimeout(() => navigate('/app'), 1000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      showToast('Failed to complete onboarding. Please try again.', true);
      setIsSubmitting(false);
    }
  };

  return (
    <Page
      title="Complete Your Setup"
      backAction={{ content: 'Dashboard', onAction: () => navigate('/app') }}
    >
      <form method="post" onSubmit={handleSubmit}>
        <Layout>
          <Layout.Section>
            <BlockStack gap="500">
              {/* Business Information */}
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
                    error={errors.businessName}
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
                      error={errors.gstNumber}
                    />

                    <TextField
                      label="PAN Number"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={(value) => handleChange('panNumber', value)}
                      autoComplete="off"
                      requiredIndicator
                      error={errors.panNumber}
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
                    error={errors.phone}
                  />
                </BlockStack>
              </Card>

              {/* Pickup Address */}
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
                    error={errors.pickupLine1}
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
                      error={errors.pickupCity}
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
                    error={errors.pickupPincode}
                  />

                  <Checkbox
                    label="Use same address for returns"
                    checked={formData.sameAsPickup}
                    onChange={(value) => handleChange('sameAsPickup', value)}
                  />
                  <input type="hidden" name="sameAsPickup" value={String(formData.sameAsPickup)} />
                </BlockStack>
              </Card>

              {/* Bank Details */}
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
                    error={errors.accountHolder}
                  />

                  <TextField
                    label="Account Number"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={(value) => handleChange('bankAccount', value)}
                    autoComplete="off"
                    requiredIndicator
                    error={errors.bankAccount}
                  />

                  <TextField
                    label="IFSC Code"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={(value) => handleChange('ifscCode', value)}
                    autoComplete="off"
                    requiredIndicator
                    error={errors.ifscCode}
                  />
                </BlockStack>
              </Card>

              {/* Terms */}
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

              {isSubmitting && <Loading message="Completing setup..." />}

              <Button
                variant="primary"
                size="large"
                submit
                disabled={!formData.agreeToTerms || !formData.authorizeCollection || isSubmitting}
                loading={isSubmitting}
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
