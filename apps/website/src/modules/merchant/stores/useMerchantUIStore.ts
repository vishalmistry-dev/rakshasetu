import { createStore } from "@/shared/stores/createStore"

interface MerchantUIStore {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  theme: "light" | "dark"

  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebarCollapse: () => void
  setTheme: (theme: "light" | "dark") => void
}

export const useMerchantUIStore = createStore<MerchantUIStore>(
  (set) => ({
    sidebarOpen: true,
    sidebarCollapsed: false,
    theme: "light",

    toggleSidebar: () => set((state) => ({
      sidebarOpen: !state.sidebarOpen
    })),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    toggleSidebarCollapse: () => set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed
    })),
    setTheme: (theme) => set({ theme }),
  }),
  {
    persist: {
      name: "merchant-ui-storage",
    },
  }
)
