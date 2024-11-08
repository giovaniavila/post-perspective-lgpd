import { useQuery } from "@tanstack/react-query";
import { getComments } from "../api/comments";

export const useComments = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  return { data, refetch, isLoading };
};
