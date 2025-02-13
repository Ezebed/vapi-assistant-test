import React, { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";
import "./VapiAssistant.css";

export const VapiAssistant = () => {
  const [vapi, setVapi] = useState(null);
  const [callStatus, setCallStatus] = useState("idle"); // Estado para rastrear la llamada

  useEffect(() => {
    // Inicializa Vapi cuando el componente se monta
    const vapiInstance = new Vapi("6a185f88-9168-40cf-bc66-c90d68ecf943"); // Reemplaza con tu clave pública
    setVapi(vapiInstance);

    // Definir las funciones de los listeners
    const handleCallStart = () => {
      setCallStatus("active");
      console.log("Llamada iniciada");
    };

    const handleCallEnd = () => {
      setCallStatus("idle");
      console.log("Llamada finalizada");
    };

    const handleSpeechStart = () => {
      console.log("El asistente está hablando");
    };

    const handleSpeechEnd = () => {
      console.log("El asistente dejó de hablar");
    };

    const handleError = (error) => {
      console.error("Error:", error);
    };

    // Configura listeners para eventos de Vapi
    vapiInstance.on("call-start", handleCallStart);
    vapiInstance.on("call-end", handleCallEnd);
    vapiInstance.on("speech-start", handleSpeechStart);
    vapiInstance.on("speech-end", handleSpeechEnd);
    vapiInstance.on("error", handleError);

    // Limpia listeners al desmontar el componente
    return () => {
      vapiInstance.off("call-start", handleCallStart);
      vapiInstance.off("call-end", handleCallEnd);
      vapiInstance.off("speech-start", handleSpeechStart);
      vapiInstance.off("speech-end", handleSpeechEnd);
      vapiInstance.off("error", handleError);
    };
  }, []);

  const startCall = () => {
    if (vapi) {
      vapi.start("4f1448be-5332-4bb5-9629-08c5ea5406c3");
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return (
    <div>
      <div className="buttons-container">
        <button
          onClick={startCall}
          disabled={callStatus === "active"} // Desactiva el botón si la llamada está activa
          className="btn btn-blue"
        >
          Iniciar llamada
        </button>
        <button
          onClick={endCall}
          disabled={callStatus === "idle"} // Desactiva el botón si no hay llamada activa
          className="btn btn-red"
        >
          Terminar llamada
        </button>
      </div>
      <p>Estado de la llamada: {callStatus}</p>
    </div>
  );
};
