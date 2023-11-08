import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAppContext } from './components/context/AppContext'
import { Dashboard, LoginPage } from './pages'

const App = () => {

  const [credentials, setCredentials] = useAppContext()
  const { isLogged } = credentials || false

  return (
    <BrowserRouter>
      <Routes>
        {
          !isLogged
            ?
            <>
              <Route path='/login' element={<LoginPage />} />
              <Route path='*' element={<Navigate to='/login' />} />
            </>
            :
            <Route path='/*' element={<Dashboard />} />
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App