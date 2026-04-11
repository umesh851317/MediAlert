import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/auth/login'
import Admin from './pages/admin/admin'
import Staff from './pages/staff/staff'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Admin Protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* Staff Protected */}
          <Route
            path="/staff"
            element={
              <ProtectedRoute role="staff">
                <Staff />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App