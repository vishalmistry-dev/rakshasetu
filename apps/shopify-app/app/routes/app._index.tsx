import { BlockStack, InlineGrid, Layout, Page, Text } from '@shopify/polaris';
import { useLoaderData, useNavigation } from 'react-router';
import { DashboardLink } from '../components/shared/DashboardLink';
import { OnboardingBanner } from '../components/shared/OnboardingBanner';
import { StatsCard } from '../components/shared/StatsCard';
import { Card } from '../components/ui/Card';
import { Loading } from '../components/ui/Loading';
import { merchantsApi } from '../lib/api/merchants';
import { ordersApi } from '../lib/api/orders';
import { formatCurrency } from '../lib/utils/format';
import { authenticate } from '../shopify.server';

export async function loader({ request }: { request: Request }) {
  const { session } = await authenticate.admin(request);

  const merchant = await merchantsApi.get(session.shop);
  const stats = await ordersApi.getStats(session.shop);

  return { merchant, stats, shop: session.shop };
}

export default function AppIndex() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  if (isLoading) {
    return (
      <Page title="Dashboard">
        <Loading message="Loading dashboard..." />
      </Page>
    );
  }

  const { merchant, stats, shop } = data;

  const handleStartOnboarding = () => {
    window.location.href = '/app/onboarding';
  };

  return (
    <Page title="Dashboard">
      <BlockStack gap="500">
        <OnboardingBanner
          status={merchant.profile.onboardingStatus}
          onStartOnboarding={handleStartOnboarding}
        />

        <Layout>
          <Layout.Section>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Today&apos;s Overview
              </Text>

              <InlineGrid columns={{ xs: 1, sm: 2, md: 4 }} gap="400">
                <StatsCard
                  title="Orders"
                  value={stats.today.orders}
                />
                <StatsCard
                  title="Revenue"
                  value={formatCurrency(stats.today.revenue)}
                />
                <StatsCard
                  title="Delivered"
                  value={stats.today.delivered}
                />
                <StatsCard
                  title="Pending"
                  value={stats.today.pending}
                />
              </InlineGrid>
            </BlockStack>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Recent Orders
                </Text>

                {stats.recent.length === 0 ? (
                  <Text as="p" variant="bodyMd" tone="subdued">
                    No orders yet. Orders will appear here once customers start placing them.
                  </Text>
                ) : (
                  <BlockStack gap="300">
                    {stats.recent.map((order: { id: string; number: string; amount: number; method: string; status: string }) => (
                      <div
                        key={order.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '12px',
                          borderBottom: '1px solid #e1e3e5',
                        }}
                      >
                        <div>
                          <Text as="p" fontWeight="semibold">
                            {order.number}
                          </Text>
                          <Text as="p" variant="bodySm" tone="subdued">
                            {order.method}
                          </Text>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <Text as="p" fontWeight="semibold">
                            {formatCurrency(order.amount)}
                          </Text>
                          <Text as="p" variant="bodySm" tone="subdued">
                            {order.status}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </BlockStack>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Quick Actions
                </Text>

                <DashboardLink shop={shop} />
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
