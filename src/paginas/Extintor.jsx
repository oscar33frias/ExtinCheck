import useAdmin from "../hooks/useAdmin";
import { useEffect ,useRef} from "react";
import ModalFormularioExtintor from "../components/ModalFormularioExtintor";
import CheckList from "../components/CheckList";
import Alerta from "../components/Alerta";
import { useParams, Link } from "react-router-dom";
import useExtintores from "../hooks/useExtintores";
import { ToastContainer } from "react-toastify";

const Extintor = () => {
  const params = useParams();

  const {
    obtenerExtintor,
    extintor,
    cargando,
    handleModalExtintor,
    checkLists,
    alerta,
  } = useExtintores();


  useEffect(() => {
    obtenerExtintor(params.id);
  }, []);



  const { codigo ,} = extintor;
  const { msg } = alerta;

  return cargando ? (
    "..."
  ) : (
    <>
            <ToastContainer></ToastContainer>

      <div className=" flex justify-between">
    
        <h1 className=" font-black text-4xl">{codigo}</h1>

   
      </div>

        <button
          onClick={handleModalExtintor}
          className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase 
      font-bold bg-green-400 text-white text-center mt-5 flex gap-2
       items-center justify-center hover:bg-green-500 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Nuevo CheckList
        </button>


      <p className=" font-bold text-xl mt-10"> CheckList del Extintor</p>
      {msg && <Alerta alerta={alerta} />}
      <div className=" bg-white shadow mt-10 rounded-lg">
        {checkLists?.length ? (
          checkLists
            .slice()
            .reverse()
            .map((checklist) => (
              <CheckList key={checklist.id} checklist={checklist} />
            ))
        ) : (
          <div className="flex justify-center items-center h-96">
            <h1 className="text-2xl font-bold">No hay CheckList</h1>
          </div>
        )}
      </div>

      <ModalFormularioExtintor />
    </>
  );
};

export default Extintor;
