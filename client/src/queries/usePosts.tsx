import { useQuery } from "@tanstack/react-query";
import { GetPost, GetPostById } from "../api/posts";

export const usePost = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: GetPost,
  });

  return { data, refetch, isLoading };
};

export const UsePostById = (PostId: number) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["postById"],
    queryFn: () => GetPostById(PostId),
  });
  return {
    data,
    refetch,
    isLoading,
  };
};
