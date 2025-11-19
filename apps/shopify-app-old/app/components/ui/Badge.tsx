import type { BadgeProps } from '@shopify/polaris';
import { Badge as PolarisBadge } from '@shopify/polaris';

export function Badge(props: BadgeProps) {
  return <PolarisBadge {...props} />;
}
