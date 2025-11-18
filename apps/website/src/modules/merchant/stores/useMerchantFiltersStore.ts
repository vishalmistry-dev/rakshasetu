import { createStore } from '@/shared/stores/createStore'

interface MerchantFiltersStore {
  search: string
  status: string | null
  dateRange: { from: Date | null; to: Date | null }

  setSearch: (search: string) => void
  setStatus: (status: string | null) => void
  setDateRange: (range: { from: Date | null; to: Date | null }) => void
  resetFilters: () => void
}

export const useMerchantFiltersStore = createStore<MerchantFiltersStore>((set) => ({
  search: '',
  status: null,
  dateRange: { from: null, to: null },

  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setDateRange: (range) => set({ dateRange: range }),
  resetFilters: () =>
    set({
      search: '',
      status: null,
      dateRange: { from: null, to: null },
    }),
}))
