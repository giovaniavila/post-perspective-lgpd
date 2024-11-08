import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("token"); // ou outra verificação de autenticação

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redireciona para login se não estiver autenticado
  }

  return <Outlet />; // Renderiza os componentes filhos se o usuário estiver autenticado
};

export default PrivateRoute;
