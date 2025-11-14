import { create, StateCreator } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

export function createStore<T>(
  stateCreator: StateCreator<T>,
  options?: {
    persist?: {
      name: string
      partialize?: (state: T) => Partial<T>
    }
  }
) {
  if (options?.persist) {
    const persistOptions: PersistOptions<T> = {
      name: options.persist.name,
      partialize: options.persist.partialize,
    }
    return create<T>()(persist(stateCreator, persistOptions))
  }

  return create<T>()(stateCreator)
}
