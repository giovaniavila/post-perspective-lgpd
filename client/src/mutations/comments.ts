import { useMutation, useQueryClient } from "@tanstack/react-query";
import NewCommentProps from "../interface/comment";
import { postComment } from "../api/comments";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newComment: NewCommentProps) => postComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
  });
};
