import { Frame, Toast as PolarisToast } from '@shopify/polaris';
import { createContext, useContext, useState, type ReactNode } from 'react';

interface ToastContextType {
  showToast: (message: string, isError?: boolean) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; isError: boolean } | null>(null);

  const showToast = (message: string, isError = false) => {
    setToast({ message, isError });
  };

  const dismissToast = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Frame>
        {children}
        {toast && (
          <PolarisToast
            content={toast.message}
            onDismiss={dismissToast}
            error={toast.isError}
          />
        )}
      </Frame>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
