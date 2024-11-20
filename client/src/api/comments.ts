import axios from "axios";
import NewCommentProps from "../interface/comment";

export const getComments = async () => {
  const response = await axios.get("http://localhost:3000/comments");
  return response.data();
};

export const getCommentsByPostId = async (postId: number) => {
  const response = await axios.get(`http://localhost:3000/comments/${postId}`);
  return response.data;
};

export const postComment = async (
  newComment: NewCommentProps
): Promise<NewCommentProps[]> => {
  const response = await axios.post(
    `http://localhost:3000/comments`,
    newComment,
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteComment = async (
  idComment: number,
  userId: number
): Promise<void> => {
  await axios.delete(`http://localhost:3000/comments/${idComment}`, {
    data: { userId },
  });
};
