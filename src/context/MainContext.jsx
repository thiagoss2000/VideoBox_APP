import { createContext, useContext, useState } from "react"
import { fetchFolders } from "../api/foldersApi"

const MainContext = createContext()

export function MainProvider({ children }) {
  const [folders, setFolders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchFoldersData = async () => {
    try {
    const token = localStorage.getItem("token")
    const res = await fetchFolders(token)
      setFolders(res.data[0]?.folders || [])
    } catch {
      setError("Erro ao carregar pastas.")
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <MainContext.Provider value={{ 
      folders, setFolders,
      error, setError,
      loading, setLoading,
      fetchFoldersData
      }}>
      {children}
    </MainContext.Provider>
  )
}

export function useData() {
  return useContext(MainContext)
}