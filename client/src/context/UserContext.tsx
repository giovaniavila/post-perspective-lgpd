import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { UserProps } from "../interface/users";
import { useUsersById } from "../queries/useUsers";
import { getUserIdFromToken } from "../hooks/useGetToken";

interface UserContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  const userId = getUserIdFromToken();

  const { data: userData, isLoading } = useUsersById(userId);

  useEffect(() => {
    if (userData) {
      setUser(userData); 
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {isLoading ? <div>Carregando...</div> : children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
