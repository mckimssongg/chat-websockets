import React from "react";
import Swal from "sweetalert2";

const chatSocket = new WebSocket(
  "ws://" + window.location.host + "/ws/chat/sala1/"
);

function App() {
  const [puerta, setPuerta] = React.useState(true);
  const [nombre_sala, setNombreSala] = React.useState("");
  const [mensaje, setMensaje] = React.useState("");
  const [esValido, setEsValido] = React.useState(false);
  const [mensajeValido, setMensajeValido] = React.useState(false);

  const nombresSalas = ["sala1"];

  const validarString = (value, setCall, setValid) => {
    if (value.trim() !== "") {
      setCall(value);
      setValid(true);
    } else {
      setCall(value);
      setValid(false);
    }
  };

  const enviarMensaje = () => {
    chatSocket.send(
      JSON.stringify({
        type: "chat_message",
        message: mensaje,
      })
    );
    setMensaje("");
  };

  const entrarSalir = () => {
    if (puerta) {
      // Entrar
      if (nombresSalas.includes(nombre_sala)) {
        setPuerta(false);
        Swal.fire({
          icon: "success",
          title: "Conectado",
          text: "Se ha conectado al chat",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setNombreSalas("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No existe la sala",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setNombreSala("");
      }
    } else {
      // Salir
      setPuerta(true);
      setNombreSala("");
    }
  };

  React.useEffect(() => {
    chatSocket.onopen = function (e) {
      console.log("Conectado al servidor");
    };
    chatSocket.onclose = function (e) {
      console.log("Desconectado del servidor");
    };
  }, []);

  if (puerta) {
    return (
      <div className="container py-4">
        <h1 className="text-center">LOGIN</h1>
        <div className="form-group">
          <label className="col-form-label" htmlFor="nombre_salas">
            Nombre de la sala:
          </label>
          <input
            className="form-control form-control-lg mb-3"
            type="text"
            id="nombre_salas"
            value={nombre_sala}
            onChange={(e) =>
              validarString(e.target.value, setNombreSala, setEsValido)
            }
            placeholder="Ejem: Sala1"
          />
        </div>
        <button
          className="btn btn-secondary d-block mx-auto align-middle"
          style={{ width: "50%" }}
          onClick={entrarSalir}
          disabled={!esValido}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-box-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
            />
            <path
              fill-rule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
            />
          </svg>
          &nbsp; Entrar
        </button>
      </div>
    );
  } else {
    return (
      <div className="container py-4">
        <h1 className="text-center">CHAT: {nombre_sala}</h1>
        <div className="form-group">
          <label className="col-form-label" htmlFor="mensaje">
            Mensaje:
          </label>
          <input
            className="form-control form-control-lg mb-3"
            type="text"
            id="mensaje"
            value={mensaje}
            onChange={(e) =>
              validarString(e.target.value, setMensaje, setMensajeValido)
            }
            placeholder="Ejem: Hola"
          />
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={entrarSalir}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-box-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
              />
              <path
                fill-rule="evenodd"
                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
              />
            </svg>
            &nbsp; Salir
          </button>
          <button
            className="btn btn-primary"
            onClick={enviarMensaje}
            disabled={!mensajeValido}
          >
            {!mensajeValido ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-send-slash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                <path d="M14.975 10.025a3.5 3.5 0 1 0-4.95 4.95 3.5 3.5 0 0 0 4.95-4.95Zm-4.243.707a2.501 2.501 0 0 1 3.147-.318l-3.465 3.465a2.501 2.501 0 0 1 .318-3.147Zm.39 3.854 3.464-3.465a2.501 2.501 0 0 1-3.465 3.465Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-send"
                viewBox="0 0 16 16"
              >
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
              </svg>
            )}
            &nbsp; Enviar
          </button>
        </div>
      </div>
    );
  }
}

export default App;
