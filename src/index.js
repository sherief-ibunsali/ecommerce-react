import React from "react";
import ReactDOM from "react-dom/client";
import Ecommerce from "./ecommerce";
import Login from "./login";
function App() {
  return (
    <div>
      {/* <Ecommerce /> */}
      <Login/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
