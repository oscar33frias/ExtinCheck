import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import AuthLayout from './layouts/AuthLayout'
import Login from './paginas/Login'


function App() {

  return (
    
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout></AuthLayout>} >
            <Route index element={<Login></Login>}></Route>
          </Route>

        </Routes>

        
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
