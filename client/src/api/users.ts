import axios from "axios";
import { UserProps } from "../interface/users";

export const getUsers = async (): Promise<UserProps[]> => {
  const response = await axios.get("http://localhost:3000/users");
  return response.data;
};

export const getUserById = async(userId: number): Promise<UserProps> => { 
  const response = await axios.get(`http://localhost:3000/users/${userId}`)
  return response.data
}

export const postUser = async (newUser: UserProps): Promise<UserProps> => {
  const response = await axios.post("http://localhost:3000/users", newUser, {
    headers: {
      "Content-type": "application/json",
    },
  });
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await axios.delete(`http://localhost:3000/users/${userId}`);
};

export const editUser = async (
  userId: number,
  updatedUser: UserProps
): Promise<UserProps> => {
  const response = await axios.put(
    `http://localhost:3000/users/${userId}`,
    updatedUser,
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  return response.data;
};

