import { create } from 'zustand'

export type TypeCurrentPage = 'dashboard' | 'incomes' | 'expenses' | 'accounts' | 'investments' | 'debts' | 'settings' 

type Store = {
  currentPage: TypeCurrentPage
  sidebarOpen: boolean
  idUser: string | null
  isLogged: boolean
  setCurrentPage: (value: TypeCurrentPage) => void
  setSidebarOpen: (value: boolean) => void
  setIdUser: (value: string | null) => void
  setIsLogged: (value: boolean) => void
}

const useApp = create<Store>()((set) => ({
  currentPage: 'dashboard',
  sidebarOpen: false,
  idUser: null,
  isLogged: false,
  setCurrentPage: (value) => set(() => ({ currentPage: value })),
  setSidebarOpen: (value) => set(() => ({ sidebarOpen: value })),
  setIdUser: (value) => set(() => ({ idUser: value })),
  setIsLogged: (value) => set(() => ({ isLogged: value})),
}))

export default useApp;