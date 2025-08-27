import { createContext, useContext, useState } from "react"

const MainContext = createContext()

export function MainProvider({ children }) {
  const [folders, setFolders] = useState([])

  return (
    <MainContext.Provider value={{ folders, setFolders }}>
      {children}
    </MainContext.Provider>
  )
}

export function useData() {
  return useContext(MainContext)
}