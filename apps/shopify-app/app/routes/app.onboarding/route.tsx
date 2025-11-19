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
import { useNavigate, useSearchParams } from 'react-router';
import { Loading } from '../../components/ui/Loading';
import { Select } from '../../components/ui/Select';
import { TextField } from '../../components/ui/TextField';
import { useToast } from '../../components/ui/Toast';
import { merchantsApi } from '../../lib/api/merchants';
import { BUSINESS_TYPES, INDIAN_STATES } from '../../lib/utils/constants';
import type { OnboardingFormData } from '../../types/merchant';

export default function Onboarding() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const shop = searchParams.get('shop') || '';

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
    pricingPlan: 'PER_ORDER' as const,
    agreeToTerms: false,
    authorizeCollection: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName) newErrors.businessName = 'Business name is required';
    if (!formData.gstNumber) newErrors.gstNumber = 'GST number is required';
    if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
    if (!formData.phone || formData.phone.length < 10)
      newErrors.phone = 'Valid phone number is required';
    if (!formData.pickupLine1) newErrors.pickupLine1 = 'Address is required';
    if (!formData.pickupCity) newErrors.pickupCity = 'City is required';
    if (!formData.pickupState) newErrors.pickupState = 'State is required';
    if (!formData.pickupPincode || formData.pickupPincode.length !== 6)
      newErrors.pickupPincode = 'Valid 6-digit pincode is required';
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

    if (!shop) {
      showToast('Shop parameter is missing', true);
      return;
    }

    setIsSubmitting(true);

    try {
      const onboardingData: OnboardingFormData = {
        businessName: formData.businessName,
        businessType: formData.businessType,
        gstNumber: formData.gstNumber,
        panNumber: formData.panNumber,
        phone: formData.phone,
        pickupAddress: {
          type: 'PICKUP' as const,
          name: formData.businessName,
          phone: formData.phone,
          line1: formData.pickupLine1,
          line2: formData.pickupLine2,
          city: formData.pickupCity,
          state: formData.pickupState,
          pincode: formData.pickupPincode,
          country: 'India',
        },
        sameAsPickup: formData.sameAsPickup,
        bankAccount: formData.bankAccount,
        confirmBankAccount: formData.bankAccount,
        ifscCode: formData.ifscCode,
        accountHolder: formData.accountHolder,
        pricingPlan: formData.pricingPlan,
        agreeToTerms: formData.agreeToTerms,
        authorizeCollection: formData.authorizeCollection,
      };
      await merchantsApi.onboard(shop, onboardingData);

      showToast('Onboarding completed successfully!');
      setTimeout(() => navigate(`/app?shop=${shop}`), 1000);
    } catch (error) {
      console.error('Onboarding error:', error);
      showToast('Failed to complete onboarding. Please try again.', true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page
      title="Complete Your Setup"
      backAction={{ content: 'Dashboard', onAction: () => navigate(`/app?shop=${shop}`) }}
    >
      <form onSubmit={handleSubmit}>
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
                    value={formData.businessName}
                    onChange={(value) => handleChange('businessName', value)}
                    autoComplete="off"
                    requiredIndicator
                    error={errors.businessName}
                  />

                  <Select
                    label="Business Type"
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
                      value={formData.gstNumber}
                      onChange={(value) => handleChange('gstNumber', value)}
                      autoComplete="off"
                      requiredIndicator
                      error={errors.gstNumber}
                    />

                    <TextField
                      label="PAN Number"
                      value={formData.panNumber}
                      onChange={(value) => handleChange('panNumber', value)}
                      autoComplete="off"
                      requiredIndicator
                      error={errors.panNumber}
                    />
                  </InlineGrid>

                  <TextField
                    label="Phone Number"
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
                    value={formData.pickupLine1}
                    onChange={(value) => handleChange('pickupLine1', value)}
                    autoComplete="off"
                    requiredIndicator
                    error={errors.pickupLine1}
                  />

                  <TextField
                    label="Address Line 2"
                    value={formData.pickupLine2}
                    onChange={(value) => handleChange('pickupLine2', value)}
                    autoComplete="off"
                  />

                  <InlineGrid columns={2} gap="400">
                    <TextField
                      label="City"
                      value={formData.pickupCity}
                      onChange={(value) => handleChange('pickupCity', value)}
                      autoComplete="off"
                      requiredIndicator
                      error={errors.pickupCity}
                    />

                    <Select
                      label="State"
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
                    value={formData.accountHolder}
                    onChange={(value) => handleChange('accountHolder', value)}
                    autoComplete="off"
                    requiredIndicator
                    error={errors.accountHolder}
                  />

                  <TextField
                    label="Account Number"
                    value={formData.bankAccount}
                    onChange={(value) => handleChange('bankAccount', value)}
                    autoComplete="off"
                    requiredIndicator
                    error={errors.bankAccount}
                  />

                  <TextField
                    label="IFSC Code"
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

                  <Checkbox
                    label="I authorize Rakshasetu to collect COD/POD payments on my behalf"
                    checked={formData.authorizeCollection}
                    onChange={(value) => handleChange('authorizeCollection', value)}
                  />
                </BlockStack>
              </Card>

              {isSubmitting && <Loading message="Completing setup..." />}

              <Button
                variant="primary"
                size="large"
                submit
                disabled={
                  !formData.agreeToTerms || !formData.authorizeCollection || isSubmitting
                }
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
