import { useState, createContext, useEffect } from "react";
import clienteAxios from "../../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const ExtintoresContext = createContext();

const ExtintoresProvider = ({ children }) => {
  const [extintores, setExtintores] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [extintor, setExtintor] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioExtintor, setModalFormularioExtintor] = useState(false);
  const [checkLists, setCheckLists] = useState([]);
  const [checkList, setCheckList] = useState({});
  const [colaboradores, setColaboradores] = useState([]);
  const [markers, setMarkers] = useState([]);
  const {auth}= useAuth();

  useEffect(() => {
    const obtenerExtintores = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.get("/extintores", config);
        setExtintores(data.extintores);
        setColaboradores(data.colaboradores);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerExtintores();
  }, [auth]);


  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };


 
  const obtenerExtintor = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(`/extintores/${id}`, config);
      console.log(data)
      setExtintor(data.extintor);
      setCheckLists(data.checklists);
      setColaboradores(data.colaboradores);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };
 

  const submitCheckList = async (checklist) => {
    if (checklist.id) {
    console.log("🚀 ~ file: ExtintoresProvider.jsx:81 ~ submitCheckList ~ checklist:", checklist)
    } else {
      await crearCheckList(checklist);
    }
  };


  const crearCheckList = async (checklist) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/checklist", checklist, config);

      setCheckLists([...checkLists, data]);

      setAlerta({});
      setModalFormularioExtintor(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleModalEditarCheckList = (checklist) => {
    setCheckList(checklist);
    setModalFormularioExtintor(true);
  };

  const handleModalExtintor = () => {
    setModalFormularioExtintor(!modalFormularioExtintor);
    setCheckList({});
  };



  return (
    <ExtintoresContext.Provider
      value={{
        extintores,
        mostrarAlerta,
        alerta,
        obtenerExtintor,
        extintor,
        cargando,
        modalFormularioExtintor,
        submitCheckList,
        checkLists,
        handleModalEditarCheckList,
        checkList,
      handleModalExtintor,
        colaboradores,
        markers,
        setMarkers,
   
      }}
    >
      {children}
    </ExtintoresContext.Provider>
  );
};

export { ExtintoresProvider };
export default ExtintoresContext;