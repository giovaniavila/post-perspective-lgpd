import { useQuery } from "@tanstack/react-query";
import { getComments, getCommentsByPostId } from "../api/comments";

export const useComments = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  return { data, refetch, isLoading };
};

export const useCommentsByPostId = (PostId: number) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["commentsByPostId"],
    queryFn: () => getCommentsByPostId(PostId),
  });
  return { data, refetch, isLoading };
};
