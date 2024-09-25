import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserProps } from "../interface/users";
import { postUser } from "../api/users";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser: UserProps) => postUser(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuário criado com sucesso!", {
        position: "bottom-left",
      });
    },
    onError: () => {
      toast.error("Houve um erro ao criar o usuário", {
        position: "bottom-left",
      });
    },
  });
};
