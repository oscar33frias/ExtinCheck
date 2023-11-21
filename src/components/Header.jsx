import useAuth from "../hooks/useAuth";


const Header = () => {
  const {cerrarSesionAuth}=useAuth()
  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    localStorage.removeItem("token");

  }
  return (
    <header className="px-4 py-5 bg-gray-900 border-b border-red-600">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-red-500 font-black text-center">
          Extintores ATR
        </h2>
   
      </div>
      <div className="flex justify-end mt-auto">
        <div className="flex items-center gap-4 mt-5">
         
          <button
            type="button"
            className="text-white text-sm bg-red-600 hover:bg-red-700 p-3 rounded-md uppercase font-bold"
            onClick={handleCerrarSesion}
          >
            Cerrar Sesion
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;
