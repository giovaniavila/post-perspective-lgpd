import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../api/Login";
import { toast } from "react-toastify";

interface LoginParams {
  email: string; 
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginParams) => postLogin(credentials),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Login realizado com sucesso!", {
        position: "bottom-left",
      });
    },
    onError: () => {
      toast.error("Houve um erro ao fazer o login", {
        position: "bottom-left",
      });
    },
  });
};
