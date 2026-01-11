import { create } from 'zustand'

export type TypeCurrentPage = 'dashboard' | 'incomes' | 'expenses' | 'accounts' | 'investments' | 'debts' | 'settings' 

type Store = {
  currentPage: TypeCurrentPage
  setCurrentPage: (value: TypeCurrentPage) => void
}

const useApp = create<Store>()((set) => ({
  currentPage: 'dashboard',
  setCurrentPage: (value) => set(() => ({ currentPage: value })),
}))

export default useApp;