import { create } from 'zustand'

export type TypeCurrentPage = 'dashboard' | 'incomes' | 'expenses' | 'accounts' | 'investments' | 'debts' | 'settings' 

type Store = {
  currentPage: TypeCurrentPage
  sidebarOpen: boolean
  setCurrentPage: (value: TypeCurrentPage) => void
  setSidebarOpen: (value: boolean) => void
}

const useApp = create<Store>()((set) => ({
  currentPage: 'dashboard',
  sidebarOpen: false,
  setCurrentPage: (value) => set(() => ({ currentPage: value })),
  setSidebarOpen: (value) => set(() => ({ sidebarOpen: value }))
}))

export default useApp;