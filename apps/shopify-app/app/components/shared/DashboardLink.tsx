import { APP_CONFIG } from '~/lib/utils/constants';
import { Button } from '../ui/Button';

interface DashboardLinkProps {
  shop: string;
}

export function DashboardLink({ shop }: DashboardLinkProps) {
  const dashboardUrl = `${APP_CONFIG.DASHBOARD_URL}/login?shop=${shop}&token=temp_token`;

  return (
    <Button
      url={dashboardUrl}
      external
      variant="primary"
    >
      Open Full Dashboard
    </Button>
  );
}
