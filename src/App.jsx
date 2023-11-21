import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./paginas/Login";
import RutaProtegida from "./layouts/RutaProtegida";
import { ExtintoresProvider } from "./context/ExtintoresProvider";
import Extintor from "./paginas/Extintor";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ExtintoresProvider>
        <Routes>
          <Route path="/" element={<AuthLayout></AuthLayout>}>
            <Route index element={<Login></Login>}></Route>
          </Route>
          <Route
            path="extintorescheck"
            element={<RutaProtegida></RutaProtegida>}

          >
            <Route
            path="editar/:id"
           element={<Extintor></Extintor>}
          />
          </Route>
          
        </Routes>
        </ExtintoresProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
