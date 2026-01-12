import { create } from 'zustand'

export type TypeCurrentPage = 'dashboard' | 'incomes' | 'expenses' | 'accounts' | 'investments' | 'debts' | 'settings' 

type Store = {
  currentPage: TypeCurrentPage
  sidebarOpen: boolean
  idUser: string | null
  isLogged: boolean
  openExpenseModal: boolean
  openMonthlyExpenseModal: boolean
  setCurrentPage: (value: TypeCurrentPage) => void
  setSidebarOpen: (value: boolean) => void
  setIdUser: (value: string | null) => void
  setIsLogged: (value: boolean) => void
  setOpenExpenseModal: (value: boolean) => void
  setOpenMonthlyExpenseModal: (value: boolean) => void
  reset: () => void
}

type TypeInitialState = {
  currentPage: TypeCurrentPage
  sidebarOpen: boolean
  idUser: string | null
  isLogged: boolean
  openExpenseModal: boolean
  openMonthlyExpenseModal: boolean
}

const initialState: TypeInitialState = {
  currentPage: 'dashboard',
  sidebarOpen: false,
  idUser: null,
  isLogged: false,
  openExpenseModal: false,
  openMonthlyExpenseModal: false,
}

const useApp = create<Store>()((set) => ({
  ...initialState,
  setCurrentPage: (value) => set(() => ({ currentPage: value })),
  setSidebarOpen: (value) => set(() => ({ sidebarOpen: value })),
  setIdUser: (value) => set(() => ({ idUser: value })),
  setIsLogged: (value) => set(() => ({ isLogged: value})),

  setOpenExpenseModal: (value) => set(() => ({ openExpenseModal: value })),
  setOpenMonthlyExpenseModal: (value) => set(() => ({ openMonthlyExpenseModal: value })),

  reset: () => set({ ...initialState }),
}))

export default useApp;