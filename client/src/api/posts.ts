import axios from "axios";

export const GetPost = async () => {
  const response = await axios.get("http://localhost:3000/posts");
  return response.data;
};

export const GetPostById = async (postId: number) => {
  const response = await axios.get(`http://localhost:3000/home/posts/${postId}`);
  return response.data;
};
