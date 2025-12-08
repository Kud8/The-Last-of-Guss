import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login/Login'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
