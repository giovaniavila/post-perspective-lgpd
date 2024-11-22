import { useUsersById } from "../queries/useUsers";
import { getUserIdFromToken } from "./useGetToken";

export function usePermission() {
  const userId = getUserIdFromToken();
  const { data } = useUsersById(userId);

  const isAdmin = data?.[0]?.admin === 1;

  return {isAdmin};
}
