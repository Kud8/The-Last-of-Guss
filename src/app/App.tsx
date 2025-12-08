import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../features/auth/pages/Login'
import RequireAuth from '../features/auth/components/RequireAuth'
import Header from './layouts/Header'
import RoundsList from '../features/rounds/pages/RoundsList'
import RoundDetail from '../features/rounds/pages/RoundDetail'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <RequireAuth>
            <Header />
          </RequireAuth>
        }
      >
        <Route path="/rounds" element={<RoundsList />} />
        <Route path="/rounds/:id" element={<RoundDetail />} />
      </Route>
      <Route path="*" element={<Navigate to="/rounds" replace />} />
    </Routes>
  )
}

export default App
