import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SendEmailProps, UserProps } from "../interface/users";
import { deleteUser, editUser, postUser, postUserEmailData } from "../api/users";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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

export const useDeleteUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: () => {
      toast.success("Usuário deletado com sucesso!", {
        position: "bottom-left",
      });
      navigate("/");
    },
    onError: () => {
      toast.error("Tivemos problemas ao deletar o usuário :(", {
        position: "bottom-left",
      });
    },
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      userId,
      updatedUser,
    }: {
      userId: number;
      updatedUser: UserProps;
    }) => editUser(userId, updatedUser),
    onSuccess: () => {
      toast.success("Usuário editado com sucesso!", {
        position: "bottom-left",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Erro ao editar o usuário!", {
        position: "bottom-left",
      });
    },
  });
};

export const useSendEmailData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendEmailProps) => postUserEmailData(payload),
    onSuccess: () => {
      toast.success("E-mail enviado com sucesso!", {
        position: "bottom-left",
      });
      queryClient.invalidateQueries({ queryKey: ["sendEmail"] });
    },
    onError: () => {
      toast.error("Erro ao enviar o e-mail!", {
        position: "bottom-left",
      });
    },
  });
};
