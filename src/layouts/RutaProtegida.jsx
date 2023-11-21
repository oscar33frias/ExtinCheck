import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  
  // Spinner para mostrar mientras carga.
  if (cargando) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!auth.id) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gray-200 min-h-screen">
            <Header />

      <div className="md:flex md:min-h-screen">
        <main className="flex-1 p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RutaProtegida;
