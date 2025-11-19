import type { EmptyStateProps } from '@shopify/polaris';
import { EmptyState as PolarisEmptyState } from '@shopify/polaris';

export function EmptyState(props: EmptyStateProps) {
  return <PolarisEmptyState {...props} />;
}
