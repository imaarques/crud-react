import "./App.css";
import { useState, useEffect } from "react";
import ModalComponent from "./components/ModalComponent";
import { format, parseISO } from "date-fns";

function App() {
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];

    setData(db_costumer);
  }, [setData]);

  const handleRemove = (id) => {
    const newArray = data.filter((item) => item.id !== id);

    setData(newArray);

    localStorage.setItem("cad_cliente", JSON.stringify(newArray));
  };

  const onOpen = (e) => {
    document.getElementById("modal-container").classList.add("modal-visivel");
    setId(Math.floor(Math.random() * 9999999));
  };

  const onClose = (e) => {
    setTitulo("");
    setDescricao("");
    setStatus("Selecione o status");
    setDeadline("");
    document
      .getElementById("modal-container")
      .classList.remove("modal-visivel");
  };

  return (
    <section className="container">
      <div className="content">
        <button onClick={() => [setDataEdit({}), onOpen()]}>
          Adicionar Tarefa
        </button>

        <span className="aviso">
          Os dados ficam salvos no Local Storage do navegador*
        </span>

        <div className="box">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Deadline</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                ({ id, titulo, descricao, deadline, status }, index) => (
                  <tr key={index}>
                    <td>
                      {index}
                      <span className="id">{id}</span>
                    </td>
                    <td>{titulo}</td>
                    <td>{descricao}</td>
                    <td>{format(parseISO(deadline), "dd/MM/yyyy")}</td>
                    <td>{status}</td>
                    <td>
                      <span
                        onClick={() => [
                          onOpen(),
                          setDataEdit({
                            id,
                            titulo,
                            descricao,
                            status,
                            deadline,
                            index,
                          }),
                          setTitulo(titulo),
                          setDescricao(descricao),
                          setStatus(status),
                          setDeadline(deadline),
                        ]}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </span>
                    </td>
                    <td>
                      <span onClick={(e) => handleRemove(id)}>
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalComponent
        onClose={onClose}
        data={data}
        setData={setData}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        setTitulo={setTitulo}
        titulo={titulo}
        setDescricao={setDescricao}
        descricao={descricao}
        setId={setId}
        id={id}
        setStatus={setStatus}
        status={status}
        setDeadline={setDeadline}
        deadline={deadline}
      />
    </section>
  );
}

export default App;
