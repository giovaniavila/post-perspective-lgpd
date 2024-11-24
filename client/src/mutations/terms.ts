import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { putTermsAndConditions } from "../api/termsAndConditions";

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
