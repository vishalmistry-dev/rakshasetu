import type { BannerProps } from '@shopify/polaris';
import { Banner as PolarisBanner } from '@shopify/polaris';

export function Banner(props: BannerProps) {
  return <PolarisBanner {...props} />;
}
