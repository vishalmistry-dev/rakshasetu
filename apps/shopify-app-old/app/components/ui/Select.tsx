import type { SelectProps } from '@shopify/polaris';
import { Select as PolarisSelect } from '@shopify/polaris';

export function Select(props: SelectProps) {
  return <PolarisSelect {...props} />;
}
