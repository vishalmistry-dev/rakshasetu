import type { SpinnerProps } from '@shopify/polaris';
import { Spinner as PolarisSpinner } from '@shopify/polaris';

export function Spinner(props: SpinnerProps) {
  return <PolarisSpinner {...props} />;
}
