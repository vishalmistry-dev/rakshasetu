import type { CheckboxProps } from '@shopify/polaris';
import { Checkbox as PolarisCheckbox } from '@shopify/polaris';

export function Checkbox(props: CheckboxProps) {
  return <PolarisCheckbox {...props} />;
}
