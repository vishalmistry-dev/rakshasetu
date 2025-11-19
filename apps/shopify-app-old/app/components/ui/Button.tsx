import type { ButtonProps } from '@shopify/polaris';
import { Button as PolarisButton } from '@shopify/polaris';

export function Button(props: ButtonProps) {
  return <PolarisButton {...props} />;
}
