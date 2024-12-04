import { useMutation, useQueryClient } from "@tanstack/react-query";
import NewCommentProps from "../interface/comment";
import { deleteComment, postComment } from "../api/comments";
import { toast } from "react-toastify";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newComment: NewCommentProps) => postComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idComment: number) => deleteComment(idComment),
    onSuccess: () => {
      toast.success("Comentário deletado com sucesso!", {
        position: "bottom-left",
      });
      queryClient.invalidateQueries({ queryKey: ["comment"] });
      window.location.reload();
    },
    onError: () => {
      toast.error("Tivemos problemas ao deletar o comentário :(", {
        position: "bottom-left",
      });
    },
  });
};
