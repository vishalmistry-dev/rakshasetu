import type { TextFieldProps } from '@shopify/polaris';
import { TextField as PolarisTextField } from '@shopify/polaris';

export function TextField(props: TextFieldProps) {
  return <PolarisTextField {...props} />;
}
