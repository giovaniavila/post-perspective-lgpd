import { useState } from "react";
import { useCreateComment } from "../mutations/comments";

const usePostComment = (user_id: number, post_id: number) => {
  const { mutate } = useCreateComment();
  const [comment, setComment] = useState("");

  const postComment = () => {
    if (comment.trim()) {
      mutate(
        {
          user_id,
          post_id,
          content: comment,
        },
        {
          onSuccess: () => {
            setComment("");
          },
          onError: (error) => {
            console.error("Error posting comment:", error);
          },
        }
      );
    }
  };

  return {
    comment,
    setComment,
    postComment,
  };
};

export default usePostComment;
