import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { Outlet } from 'react-router';
import { ToastProvider } from '../../components/ui/Toast';

export default function AppLayout() {
  return (
    <AppProvider i18n={{}}>
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </AppProvider>
  );
}
