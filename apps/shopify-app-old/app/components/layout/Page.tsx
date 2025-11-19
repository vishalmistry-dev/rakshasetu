import type { PageProps } from '@shopify/polaris';
import { Page as PolarisPage } from '@shopify/polaris';

export function Page({ children, ...props }: PageProps) {
  return <PolarisPage {...props}>{children}</PolarisPage>;
}
