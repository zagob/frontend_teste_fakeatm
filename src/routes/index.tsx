import { Routes, Route } from "react-router-dom";
import { ClientsAvailable } from "../pages/ClientsAvailable";
import { Login } from "../pages/Login";
import { Subscribe } from "../pages/Subscribe";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Subscribe />} />
      <Route path="/clientes" element={<ClientsAvailable />} />
    </Routes>
  );
}
