import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  acceptNewTerms,
  putTermsAndConditions,
} from "../api/termsAndConditions";
import { AcceptTermsProps } from "../interface/terms";

export const useEditTerms = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ updateTerms }: any) => putTermsAndConditions(updateTerms),
    onSuccess: () => {
      toast.success("Termos editado com sucesso!", {
        position: "bottom-left",
      });
      queryClient.invalidateQueries({ queryKey: ["terms"] });
    },
    onError: () => {
      toast.error("Erro ao editar os Termos!", {
        position: "bottom-left",
      });
    },
  });
};

export const useAcceptNewTerms = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, terms_accepted }: AcceptTermsProps) =>
      acceptNewTerms(userId, terms_accepted),
    onSuccess: () => {
      toast.success("Você aceitou os novos termos", {
        position: "bottom-left",
      });
      queryClient.invalidateQueries({ queryKey: ["terms"] });
    },
    onError: () => {
      toast.error("Erro ao aceitar os Termos!", {
        position: "bottom-left",
      });
    },
  });
};
