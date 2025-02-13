import { useState } from "react";
import "./App.css";
import { VapiAssistant } from "./components/VapiAssistant/VapiAsistant";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1 className="title">Vapi assitant Test</h1>
      <VapiAssistant />
    </div>
  );
}

export default App;
