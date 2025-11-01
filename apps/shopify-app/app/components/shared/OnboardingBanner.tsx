import { Banner } from '../ui/Banner';

interface OnboardingBannerProps {
  status: 'PENDING' | 'COMPLETED' | 'SKIPPED';
  onStartOnboarding: () => void;
}

export function OnboardingBanner({ status, onStartOnboarding }: OnboardingBannerProps) {
  if (status === 'COMPLETED') return null;

  return (
    <Banner
      title="Complete your setup to start accepting orders"
      tone="warning"
      action={{
        content: 'Complete Setup',
        onAction: onStartOnboarding,
      }}
      onDismiss={status === 'SKIPPED' ? undefined : () => { }}
    >
      <p>Add your business details, bank information, and pickup address to start processing orders.</p>
    </Banner>
  );
}
