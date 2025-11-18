
import { Page, Tabs } from '@shopify/polaris';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

export default function Settings() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'general', content: 'General', url: '/app/settings/general' },
    { id: 'pricing', content: 'Pricing', url: '/app/settings/pricing' },
    { id: 'notifications', content: 'Notifications', url: '/app/settings/notifications' },
    { id: 'integrations', content: 'Integrations', url: '/app/settings/integrations' },
    { id: 'returns', content: 'Returns', url: '/app/settings/returns' },
  ];

  const getCurrentTab = () => {
    const path = location.pathname;
    const currentTab = tabs.findIndex(tab => path.includes(tab.id));
    return currentTab !== -1 ? currentTab : 0;
  };

  const [selected, setSelected] = useState(getCurrentTab());

  useEffect(() => {
    setSelected(getCurrentTab());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleTabChange = (selectedTabIndex: number) => {
    setSelected(selectedTabIndex);
    navigate(tabs[selectedTabIndex].url);
  };

  return (
    <Page title="Settings">
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <div style={{ marginTop: '20px' }}>
          {/* @ts-expect-error - React Router Outlet type issue */}
          <Outlet />
        </div>
      </Tabs>
    </Page>
  );
}
