import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import { StoreProvider } from "./store/store";



ReactDOM.render(
  <React.StrictMode>
    
    <StoreProvider>
      
      <App />
      
    </StoreProvider>
    
    
  </React.StrictMode>,
  document.getElementById("root")
);
