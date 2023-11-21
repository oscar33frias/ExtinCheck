import { useNavigate,} from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/clienteAxios";
import useAuth from "../hooks/useAuth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
 
  const {setAuth} = useAuth();

  const navigate= useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if([email,password].includes('')){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    try {
      const {data} = await clienteAxios.post('/usuarios/login', {email, password});
      localStorage.setItem("token", data.token);
      setAuth(data);
     navigate('/extintorescheck');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      }); 
      }
    }
  
const {msg} = alerta;

  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="w-3/4 p-4 md:p-10 bg-white shadow-lg rounded-lg">
      {msg && <Alerta alerta={alerta} />}
      <h1 className="text-red-600 font-black text-3xl md:text-6xl capitalize text-center">
        Inicia sesión y Realiza tus
        <span className="text-yellow-700"> checkList</span>
      </h1>
      <form className="my-10" onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 shadow-inner"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-200 shadow-inner"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar sesión"
          className="bg-red-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-red-800 transition-colors duration-200"
        />
      </form>
     
    </div>
  </div>
  );
};

export default Login;
