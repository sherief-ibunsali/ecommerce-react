import "./ecommerce.css";
import { useState } from "react";
import Ecommerce from "./ecommerce";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    if (email === "sherief@email.com" && password === "she12345") {
      setLoggedIn(true);
      setError("");
    } else {
      setLoggedIn(false);
      setError("Invalid email or password");
    }
  };

  if (loggedIn) {
    return <Ecommerce />;
  }

  return (
    <form>
      <label>Email</label>
      <input 
        placeholder="Enter your email" 
        type="text" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <label>Password</label>
      <input 
        placeholder="Enter your password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      {error && <p style={{ color: "red" ,marginTop:"9px"}}>{error}</p>}
      <button className="btn-lgn" onClick={handleLogin}>Login</button>
    </form>
  );
}
