import { useQuery } from "@tanstack/react-query";
import { getUserById, getUsers } from "../api/users";

export const useUsers = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return { data, refetch, isLoading };
};

export const useUsersById = (userId: number) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(userId),
  });
  return { data, refetch, isLoading };
};
