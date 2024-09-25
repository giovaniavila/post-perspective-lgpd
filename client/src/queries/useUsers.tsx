import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users";

export const useUsers = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return { data, refetch, isLoading };
};
