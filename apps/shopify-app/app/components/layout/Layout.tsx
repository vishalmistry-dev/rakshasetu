import type { LayoutProps } from '@shopify/polaris';
import { Layout as PolarisLayout } from '@shopify/polaris';

export function Layout({ children, ...props }: LayoutProps) {
  return <PolarisLayout {...props}>{children}</PolarisLayout>;
}

Layout.Section = PolarisLayout.Section;
